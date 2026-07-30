import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AnswerSheetViewer } from '../components/workspace/AnswerSheetViewer';
import { StepMarkingPanel } from '../components/workspace/StepMarkingPanel';
import { StudentAnswerSheet } from '../types';

export const EvaluationWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    rooms,
    activeRoomId,
    updateStepMark,
    approveEvaluation,
    flagEvaluation,
    requestReview,
    recalculateEvaluation
  } = useApp();

  // Find target room and student sheet
  const currentRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];
  const allStudents = currentRoom ? currentRoom.students : [];

  const initialIndex = Math.max(0, allStudents.findIndex(s => s.id === id));
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const [selectedStepId, setSelectedStepId] = useState<string>('step-1-1');

  useEffect(() => {
    if (id) {
      const idx = allStudents.findIndex(s => s.id === id);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [id, allStudents]);

  const currentStudent: StudentAnswerSheet = allStudents[currentIndex] || allStudents[0];

  // Student Navigation
  const handlePreviousStudent = () => {
    if (currentIndex > 0) {
      const prev = allStudents[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      navigate(`/evaluations/${prev.id}`);
    }
  };

  const handleNextStudent = () => {
    if (currentIndex < allStudents.length - 1) {
      const next = allStudents[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      navigate(`/evaluations/${next.id}`);
    }
  };

  const handleApproveAndNext = () => {
    if (currentStudent) {
      approveEvaluation(currentStudent.id);
      handleNextStudent();
    }
  };

  // Global Keyboard Shortcuts (Key: A = Approve & Next, Left = Prev, Right = Next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleApproveAndNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePreviousStudent();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextStudent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentStudent]);

  if (!currentStudent) {
    return (
      <div className="p-12 text-center text-slate-500">
        No student evaluation sheet found. Please return to the dashboard.
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-slate-900">
      {/* Left Column: Student Answer Sheet PDF/Canvas Viewer */}
      <div className="w-full md:w-3/5 lg:w-3/5 h-full">
        <AnswerSheetViewer
          student={currentStudent}
          selectedStepId={selectedStepId}
          onSelectStep={setSelectedStepId}
          onPreviousStudent={handlePreviousStudent}
          onNextStudent={handleNextStudent}
          currentIndex={currentIndex}
          totalStudents={allStudents.length}
        />
      </div>

      {/* Right Column: AI Step-Marking & Review Panel */}
      <div className="w-full md:w-2/5 lg:w-2/5 h-full border-l border-slate-200">
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
