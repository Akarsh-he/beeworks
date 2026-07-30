import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Flag,
  MessageSquare,
  Sparkles,
  Edit2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Save
} from 'lucide-react';
import { StudentAnswerSheet, EvaluationStep } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface StepMarkingPanelProps {
  student: StudentAnswerSheet;
  selectedStepId?: string;
  onSelectStep: (stepId: string) => void;
  onUpdateStepMark: (questionId: string, stepId: string, marks: number, note?: string) => void;
  onApproveAndNext: () => void;
  onRecalculate: () => void;
  onRequestReview: () => void;
  onFlagPaper: (reason: string) => void;
}

export const StepMarkingPanel: React.FC<StepMarkingPanelProps> = ({
  student,
  selectedStepId,
  onSelectStep,
  onUpdateStepMark,
  onApproveAndNext,
  onRecalculate,
  onRequestReview,
  onFlagPaper
}) => {
  const [activeFeedbackStepId, setActiveFeedbackStepId] = useState<string | null>(null);
  const [customComment, setCustomComment] = useState<string>('');
  const [flagModalOpen, setFlagModalOpen] = useState<boolean>(false);
  const [flagReasonInput, setFlagReasonInput] = useState<string>('');

  const activeQuestion = student.questions[0];

  const totalMaxMarks = activeQuestion ? activeQuestion.maxScore : 6;
  const currentAwardedMarks = activeQuestion ? activeQuestion.totalScore : student.overallScore;

  const quickFeedbackPresets = [
    "Good attempt",
    "Check calculations",
    "Sign error in formula",
    "Step missing",
    "Correct method applied"
  ];

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 overflow-y-auto">
      {/* Top Marking Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/80">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Evaluation Room 101 • Q1 Breakdown
            </span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              {student.studentName}
              <Badge variant={student.status} size="sm" />
            </h2>
          </div>

          {/* Animated Total Score Box */}
          <div className="flex flex-col items-end">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-md flex items-baseline gap-1">
              <span className="text-2xl font-black text-amber-400">{currentAwardedMarks}</span>
              <span className="text-xs text-slate-400 font-bold">/ {totalMaxMarks} Marks</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              AI Confidence: <strong className="text-slate-800">{student.confidenceRate}%</strong>
            </span>
          </div>
        </div>

        {/* Core Principle Banner */}
        <div className="flex items-center justify-between text-xs bg-amber-50 border border-amber-200/80 px-3 py-2 rounded-lg text-amber-900">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>Core Principle:</strong> AI assists. Teachers decide. Click any step score to override.</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Interactive Evaluation Panel */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Step-By-Step AI Scoring Breakdown
          </h3>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={onRecalculate}
            className="text-xs text-slate-500"
          >
            Recalculate Score
          </Button>
        </div>

        {activeQuestion && activeQuestion.steps.length > 0 ? (
          <div className="space-y-3">
            {activeQuestion.steps.map((step) => {
              const isSelected = selectedStepId === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => onSelectStep(step.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/30 shadow-md ring-2 ring-amber-400/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Step Number Badge */}
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                        step.status === 'Correct'
                          ? 'bg-emerald-100 text-emerald-800'
                          : step.status === 'Partial'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {step.stepNumber}
                      </span>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          {step.title}
                          <Badge variant={step.confidence} size="sm" />
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {step.reasoning}
                        </p>
                        {step.teacherNote && (
                          <div className="mt-2 text-xs text-amber-800 bg-amber-100/60 px-2.5 py-1 rounded border border-amber-200 font-medium flex items-center gap-1.5">
                            <MessageSquare className="w-3 h-3 text-amber-600" />
                            <span>Teacher Note: {step.teacherNote}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interactive Mark Override Buttons */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Award Mark</span>
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        {[0, 0.5, 1].map(mark => {
                          const isMax = mark === step.maxMarks;
                          const isCurrent = step.awardedMarks === mark;

                          return (
                            <button
                              key={mark}
                              onClick={() => onUpdateStepMark(activeQuestion.id, step.id, mark)}
                              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${
                                isCurrent
                                  ? mark > 0
                                    ? 'bg-emerald-600 text-white shadow'
                                    : 'bg-rose-600 text-white shadow'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                              title={`Override to ${mark} mark`}
                            >
                              {mark}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Quick Feedback Pill Controls on Selection */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-wrap items-center gap-1.5 animate-in fade-in">
                      <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Quick Note:</span>
                      {quickFeedbackPresets.map(preset => (
                        <button
                          key={preset}
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateStepMark(activeQuestion.id, step.id, step.awardedMarks, preset);
                          }}
                          className="px-2 py-0.5 text-[11px] font-medium bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-md transition-colors"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            No questions initialized for this sheet.
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
        {/* Main Approval Action Row */}
        <div className="flex items-center gap-3">
          <Button
            variant="gold"
            size="lg"
            className="flex-1 text-slate-950 font-extrabold"
            leftIcon={<CheckCircle2 className="w-5 h-5 text-slate-950" />}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onApproveAndNext}
          >
            Approve & Next [A]
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={onRequestReview}
            title="Request Review from Head of Department"
          >
            Review Required
          </Button>

          <Button
            variant="ghost"
            size="md"
            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            onClick={() => setFlagModalOpen(true)}
            title="Flag Paper for handwriting issue"
          >
            <Flag className="w-4 h-4" />
          </Button>
        </div>

        {/* Keyboard Shortcuts Helper */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>Shortcuts: <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono text-slate-700">A</kbd> Approve & Next • <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono text-slate-700">←</kbd> Prev • <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono text-slate-700">→</kbd> Next</span>
          <span className="text-emerald-600 flex items-center gap-1 font-bold">
            <Zap className="w-3 h-3" /> Live Sync
          </span>
        </div>
      </div>

      {/* Flag Paper Modal */}
      {flagModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Flag className="w-5 h-5 text-rose-500" />
              Flag Answer Sheet
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Flagging will remove this paper from automatic gradebook export until reviewed by admin.
            </p>
            <textarea
              className="w-full border border-slate-300 rounded-lg p-3 text-xs focus:ring-slate-900 focus:border-slate-900 mb-4"
              rows={3}
              placeholder="Reason for flagging (e.g. illegible handwriting, missing pages)..."
              value={flagReasonInput}
              onChange={e => setFlagReasonInput(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setFlagModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  onFlagPaper(flagReasonInput || "Unclear handwriting");
                  setFlagModalOpen(false);
                }}
              >
                Flag Paper
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
