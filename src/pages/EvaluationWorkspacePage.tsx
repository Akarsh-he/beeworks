import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AnswerSheetViewer } from '../components/workspace/AnswerSheetViewer';
import { StepMarkingPanel } from '../components/workspace/StepMarkingPanel';
import { StudentAnswerSheet } from '../types';
import { api } from '../services/api';
import { toast } from 'sonner';

function formatSheet(s: any): StudentAnswerSheet {
  return {
    id: s.id,
    roomId: s.roomId,
    studentName: s.studentName,
    rollNumber: s.studentRollNo || '01',
    status: s.status === 'COMPLETED' ? 'Approved' : 'Pending',
    overallScore: s.totalAwarded || 0,
    maxScore: s.maxScore || 10,
    confidenceRate: 98,
    submissionDate: new Date(s.createdAt).toLocaleString(),
    timeSpentSeconds: 15,
    pageImages: [s.fileUrl],
    questions: (s.evaluationSteps || []).map((st: any) => ({
      id: st.id || st.stepId,
      questionNumber: st.questionNo,
      topic: st.stepDescription,
      maxScore: st.maxMarks,
      totalScore: st.awardedMarks,
      confidence: 98,
      steps: [
        {
          id: st.id || st.stepId,
          stepNumber: 1,
          description: st.stepDescription,
          maxMarks: st.maxMarks,
          awardedMarks: st.awardedMarks,
          status: st.awardedMarks === st.maxMarks
            ? 'Correct'
            : st.awardedMarks > 0
              ? 'Partial'
              : 'Incorrect',
          feedback: st.stepFeedback,
          isFlagged: false,
        },
      ],
    })),
  };
}

export const EvaluationWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    rooms,
    activeRoomId,
    refreshData,
    updateStepMark,
    approveEvaluation,
    flagEvaluation,
    requestReview,
    recalculateEvaluation,
  } = useApp();

  // ─── Derive room + sibling sheets from context ───────────────────────────
  const currentRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];
  const allStudents = currentRoom ? currentRoom.students : [];

  // ─── Local state ─────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedStepId, setSelectedStepId] = useState<string>('');
  const [fetchedStudent, setFetchedStudent] = useState<StudentAnswerSheet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  // Keep a ref to allStudents so callbacks always have the latest list
  const allStudentsRef = useRef(allStudents);
  useEffect(() => { allStudentsRef.current = allStudents; }, [allStudents]);

  // ─── Fetch / locate current sheet when id changes ─────────────────────────
  useEffect(() => {
    if (!id) return;

    setFetchedStudent(null);
    const idx = allStudents.findIndex(s => s.id === id);

    if (idx !== -1) {
      setCurrentIndex(idx);
      return;
    }

    // Not in local state yet — fetch from API
    setLoading(true);
    api.evaluations
      .getSheet(id)
      .then(res => {
        if (res.success && res.answerSheet) {
          setFetchedStudent(formatSheet(res.answerSheet));
        }
      })
      .catch(e => console.warn('Could not fetch sheet:', e))
      .finally(() => setLoading(false));
  }, [id]); // Only re-run when the ID in the URL changes

  // Update currentIndex when allStudents updates and we can now find the sheet
  useEffect(() => {
    if (!id) return;
    const idx = allStudents.findIndex(s => s.id === id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      setFetchedStudent(null); // use local data now
    }
  }, [allStudents, id]);

  const currentStudent: StudentAnswerSheet =
    fetchedStudent || allStudents[currentIndex] || allStudents[0];

  // ─── Auto-run AI evaluation on PENDING sheets ─────────────────────────────
  const autoEvalTriggeredRef = useRef<string | null>(null);
  useEffect(() => {
    if (
      !currentStudent ||
      evaluating ||
      currentStudent.questions.length > 0 || // already has steps
      autoEvalTriggeredRef.current === currentStudent.id
    ) return;

    // Sheet is PENDING with no steps — auto-trigger evaluation
    autoEvalTriggeredRef.current = currentStudent.id;
    setEvaluating(true);
    toast.info('Auto-starting Gemini AI evaluation for this sheet…');

    api.evaluations
      .processSheet(currentStudent.id)
      .then(res => {
        if (res.success) {
          toast.success('AI evaluation complete! Results loaded.');
          // Refresh to get updated steps
          return refreshData().then(() => {
            // Also re-fetch the sheet directly to update fetchedStudent
            return api.evaluations.getSheet(currentStudent.id);
          });
        }
      })
      .then(res => {
        if (res?.success && res.answerSheet) {
          setFetchedStudent(formatSheet(res.answerSheet));
        }
      })
      .catch(e => {
        toast.error(e?.response?.data?.message || 'AI evaluation failed. Try manually.');
      })
      .finally(() => setEvaluating(false));
  }, [currentStudent?.id, currentStudent?.questions?.length]);

  // ─── Navigation helpers ───────────────────────────────────────────────────
  const navigateTo = useCallback((student: StudentAnswerSheet) => {
    const newIdx = allStudentsRef.current.findIndex(s => s.id === student.id);
    if (newIdx !== -1) setCurrentIndex(newIdx);
    navigate(`/evaluations/${student.id}`);
  }, [navigate]);

  const handlePreviousStudent = useCallback(() => {
    const students = allStudentsRef.current;
    if (currentIndex > 0) {
      navigateTo(students[currentIndex - 1]);
    }
  }, [currentIndex, navigateTo]);

  const handleNextStudent = useCallback(() => {
    const students = allStudentsRef.current;
    if (currentIndex < students.length - 1) {
      navigateTo(students[currentIndex + 1]);
    } else {
      toast.info('This is the last answer sheet in the room.');
    }
  }, [currentIndex, navigateTo]);

  // ─── Approve + navigate to next ──────────────────────────────────────────
  const handleApproveAndNext = useCallback(async () => {
    if (!currentStudent) return;

    const students = allStudentsRef.current;
    const nextStudent = students[currentIndex + 1];

    // 1. Navigate first so the user isn't stuck waiting
    if (nextStudent) {
      navigateTo(nextStudent);
    } else {
      toast.info('All sheets reviewed! Returning to dashboard…');
    }

    // 2. Approve in the background
    try {
      await approveEvaluation(currentStudent.id);
      if (!nextStudent) navigate('/dashboard');
    } catch (_) {
      // error already toasted
    }
  }, [currentStudent, currentIndex, navigateTo, approveEvaluation, navigate]);

  // ─── Re-run AI evaluation manually ───────────────────────────────────────
  const handleProcessAiEvaluation = async () => {
    if (!currentStudent) return;
    setEvaluating(true);
    toast.info('Running Gemini 2.5 Pro evaluation…');
    try {
      const res = await api.evaluations.processSheet(currentStudent.id);
      if (res.success) {
        toast.success('Evaluation complete!');
        await refreshData();
        const fresh = await api.evaluations.getSheet(currentStudent.id);
        if (fresh?.success && fresh.answerSheet) {
          setFetchedStudent(formatSheet(fresh.answerSheet));
        }
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Evaluation failed. Check your Gemini API key.');
    } finally {
      setEvaluating(false);
    }
  };

  // ─── Keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'a' || e.key === 'A') { e.preventDefault(); handleApproveAndNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePreviousStudent(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); handleNextStudent(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleApproveAndNext, handlePreviousStudent, handleNextStudent]);

  // ─── Render ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-medium">Loading evaluation workspace…</p>
        </div>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="p-12 text-center text-slate-400 bg-slate-900 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-4">
        <p className="text-base font-semibold">No student evaluation sheet found for this ID.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-bold text-xs hover:bg-amber-400 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden bg-slate-900">
      {/* Left Column: Answer Sheet PDF Viewer */}
      <div className="w-full lg:w-3/5 h-[500px] sm:h-[600px] lg:h-full shrink-0 lg:shrink flex flex-col">
        <AnswerSheetViewer
          student={currentStudent}
          selectedStepId={selectedStepId}
          onSelectStep={setSelectedStepId}
          onPreviousStudent={handlePreviousStudent}
          onNextStudent={handleNextStudent}
          currentIndex={currentIndex}
          totalStudents={allStudents.length || 1}
        />
      </div>

      {/* Right Column: AI Step-Marking Panel */}
      <div className="w-full lg:w-2/5 min-h-[500px] lg:h-full border-t lg:border-t-0 lg:border-l border-slate-800 shrink-0 lg:shrink flex flex-col">
        <div className="p-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
          {evaluating ? (
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
              <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              Running Gemini 2.5 Pro…
            </div>
          ) : (
            <span className="text-[11px] text-slate-500 font-medium">
              Sheet {currentIndex + 1} of {allStudents.length || 1}
            </span>
          )}
          <button
            onClick={handleProcessAiEvaluation}
            disabled={evaluating}
            className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold hover:bg-amber-500/30 transition-colors disabled:opacity-50"
          >
            ⚡ Re-run Gemini 2.5 Pro
          </button>
        </div>

        <StepMarkingPanel
          student={currentStudent}
          selectedStepId={selectedStepId}
          onSelectStep={setSelectedStepId}
          onUpdateStepMark={(questionId, stepId, marks, note) =>
            updateStepMark(currentStudent.id, questionId, stepId, marks, note)
          }
          onApproveAndNext={handleApproveAndNext}
          onRecalculate={() => recalculateEvaluation(currentStudent.id)}
          onRequestReview={() => requestReview(currentStudent.id)}
          onFlagPaper={(reason) => flagEvaluation(currentStudent.id, reason)}
        />
      </div>
    </div>
  );
};
