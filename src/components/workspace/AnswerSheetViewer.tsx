import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  Layers
} from 'lucide-react';
import { StudentAnswerSheet, EvaluationStep } from '../../types';

interface AnswerSheetViewerProps {
  student: StudentAnswerSheet;
  selectedStepId?: string;
  onSelectStep: (stepId: string) => void;
  onPreviousStudent: () => void;
  onNextStudent: () => void;
  currentIndex: number;
  totalStudents: number;
}

export const AnswerSheetViewer: React.FC<AnswerSheetViewerProps> = ({
  student,
  selectedStepId,
  onSelectStep,
  onPreviousStudent,
  onNextStudent,
  currentIndex,
  totalStudents
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showAIOverlays, setShowAIOverlays] = useState<boolean>(true);
  const [rotation, setRotation] = useState<number>(0);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoomLevel(100);
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const activeQuestion = student.questions[0];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-l-2xl overflow-hidden border-r border-slate-800">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 text-xs shrink-0">
        {/* Student Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={onPreviousStudent}
              disabled={currentIndex === 0}
              className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 hover:bg-slate-700 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Previous Paper [Key: Left Arrow]"
              aria-label="Previous Student Paper"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-2 font-semibold text-amber-400 text-xs">
              {currentIndex + 1} of {totalStudents}
            </span>
            <button
              onClick={onNextStudent}
              disabled={currentIndex === totalStudents - 1}
              className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 hover:bg-slate-700 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Next Paper [Key: Right Arrow]"
              aria-label="Next Student Paper"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-xs truncate max-w-[120px] sm:max-w-[180px]">{student.studentName}</span>
            <span className="text-[10px] text-slate-400">Roll: {student.rollNumber}</span>
          </div>
        </div>

        {/* Center: Toggle AI Highlights */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAIOverlays(!showAIOverlays)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[44px] ${
              showAIOverlays
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">AI Step Highlights</span>
            <span className="sm:hidden">AI Highlights</span>
          </button>
        </div>

        {/* Right: Zoom & Rotate Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="w-10 text-center text-[11px] font-mono text-slate-300">
            {zoomLevel}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ml-1"
            title="Rotate Page"
            aria-label="Rotate Page"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Answer Sheet View Canvas Area */}
      <div className="flex-1 overflow-auto p-6 bg-slate-950 flex justify-center items-start relative select-none">
        <div
          className="transition-transform duration-200 ease-out origin-top relative shadow-2xl rounded-sm"
          style={{
            transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
            width: '680px',
            minHeight: '880px',
            backgroundColor: '#ffffff',
            color: '#0f172a'
          }}
        >
          {/* Simulated Handwritten Answer Sheet Paper */}
          <div className="p-10 font-mono relative leading-relaxed text-slate-900" style={{ fontFamily: '"Comic Sans MS", "Caveat", "Kalam", cursive, sans-serif' }}>
            {/* Paper Header */}
            <div className="border-b-2 border-slate-300 pb-4 mb-6 flex justify-between items-end text-sm">
              <div>
                <p className="font-bold text-slate-700 text-xs uppercase tracking-wider">Mid-Term Examination 2025</p>
                <p className="text-base font-extrabold text-slate-900">Name: {student.studentName}</p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p>Roll No: {student.rollNumber}</p>
                <p>Page 1 of 2</p>
              </div>
            </div>

            {/* Handwritten Math Problem Q1 Solution */}
            <div className="space-y-6 text-base text-blue-900 font-semibold relative">
              <div className="text-slate-800 font-bold text-sm bg-slate-100 p-2.5 rounded border border-slate-200">
                Q1. Solve the quadratic equation: <span className="font-sans font-bold">2x² - 5x - 3 = 0</span> for x.
              </div>

              {/* Step 1 */}
              <div
                onClick={() => onSelectStep('step-1-1')}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative ${
                  selectedStepId === 'step-1-1'
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-400/50'
                    : 'border-transparent hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                <p className="text-xs text-slate-500 font-sans mb-1 font-bold">Step 1: Standard form & coefficients</p>
                <p className="text-lg">Given equation: 2x² - 5x - 3 = 0</p>
                <p className="text-lg">Here, a = 2 , b = -5 , c = -3</p>
                
                {showAIOverlays && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded shadow">
                    ✓ AI Mark: 1/1
                  </div>
                )}
              </div>

              {/* Step 2 */}
              <div
                onClick={() => onSelectStep('step-1-2')}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative ${
                  selectedStepId === 'step-1-2'
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-400/50'
                    : 'border-transparent hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                <p className="text-xs text-slate-500 font-sans mb-1 font-bold">Step 2: Formula statement</p>
                <p className="text-xl italic">x = [ -b ± √(b² - 4ac) ] / (2a)</p>
                
                {showAIOverlays && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded shadow">
                    ✓ AI Mark: 1/1
                  </div>
                )}
              </div>

              {/* Step 3 */}
              <div
                onClick={() => onSelectStep('step-1-3')}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative ${
                  selectedStepId === 'step-1-3'
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-400/50'
                    : 'border-transparent hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                <p className="text-xs text-slate-500 font-sans mb-1 font-bold">Step 3: Substitution</p>
                <p className="text-lg">x = [ -(-5) ± √((-5)² - 4(2)(-3)) ] / (2 × 2)</p>
                
                {showAIOverlays && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded shadow">
                    ✓ AI Mark: 1/1
                  </div>
                )}
              </div>

              {/* Step 4 */}
              <div
                onClick={() => onSelectStep('step-1-4')}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative ${
                  selectedStepId === 'step-1-4'
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-400/50'
                    : 'border-transparent hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                <p className="text-xs text-slate-500 font-sans mb-1 font-bold">Step 4: Discriminant Calculation</p>
                <p className="text-lg">Discriminant = 25 + 24 = 49</p>
                <p className="text-lg">x = [ 5 ± √49 ] / 4</p>
                
                {showAIOverlays && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded shadow">
                    ✓ AI Mark: 1/1
                  </div>
                )}
              </div>

              {/* Step 5 & 6 */}
              <div
                onClick={() => onSelectStep('step-1-5')}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative ${
                  selectedStepId === 'step-1-5' || selectedStepId === 'step-1-6'
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-400/50'
                    : 'border-transparent hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                <p className="text-xs text-slate-500 font-sans mb-1 font-bold">Step 5 & 6: Root Simplification & Final Answer</p>
                <p className="text-lg">x = (5 ± 7) / 4</p>
                <p className="text-lg text-emerald-800 font-bold border-2 border-emerald-500 p-2 inline-block rounded bg-emerald-50/80 mt-2">
                  x₁ = (5 + 7)/4 = 3 &nbsp;&nbsp;|&nbsp;&nbsp; x₂ = (5 - 7)/4 = -1/2
                </p>
                
                {showAIOverlays && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded shadow">
                    ✓ AI Mark: 2/2
                  </div>
                )}
              </div>
            </div>

            {/* Handwritten Teacher Seal Placeholder */}
            <div className="mt-12 text-right opacity-60 text-xs font-sans font-semibold text-slate-400">
              Evaluated by BeeWorks AI Engine v2.4 • DPS Math Dept
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
