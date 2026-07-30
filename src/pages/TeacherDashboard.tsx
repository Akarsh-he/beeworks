import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import {
  FolderPlus,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  TrendingUp,
  Zap,
  ArrowRight,
  FileText,
  Users,
  ChevronRight
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, teacherStats, rooms, createRoom } = useApp();

  const [isDragOver, setIsDragOver] = useState(false);
  const [quickUploadSuccess, setQuickUploadSuccess] = useState(false);

  const handleQuickUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickUploadSuccess(true);
    setTimeout(() => {
      const newRoomId = createRoom({
        roomName: "Quick Upload Room – Math Assessment",
        className: "Class 10",
        section: "A",
        subject: "Mathematics",
        examTitle: "Unit Quiz 4",
        questionPaperName: "Quick_Upload_QP.pdf",
        totalSheets: 15
      });
      setQuickUploadSuccess(false);
      navigate(`/evaluations/sheet-${newRoomId}-1`);
    }, 800);
  };

  // Find all active rooms & recently reviewed student papers
  const activeRooms = rooms.filter(r => r.status === 'Active');
  const allStudents = rooms.flatMap(r => r.students);
  const recentlyReviewed = allStudents.filter(s => s.status === 'Approved' || s.status === 'Review Required');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Greeting & Quick Stats Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 lg:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Year 2025 - 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Good morning, {user.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              You have <span className="text-amber-400 font-bold">{activeRooms.length} active evaluation rooms</span> pending review today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="gold"
              size="md"
              leftIcon={<FolderPlus className="w-4 h-4 text-slate-950" />}
              onClick={() => navigate('/rooms/create')}
              className="font-extrabold text-slate-950"
            >
              Create New Room
            </Button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Rooms</span>
            <span className="text-2xl font-black text-white mt-1 block">{teacherStats.totalRooms}</span>
            <span className="text-[10px] text-slate-400 font-semibold">Across Class 9 & 10</span>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Evaluations Done</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">{teacherStats.evaluationsCompleted}</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14 this week
            </span>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Time Saved</span>
            <span className="text-2xl font-black text-white mt-1 block">
              {teacherStats.timeSavedHours}h {teacherStats.timeSavedMinutes}m
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">2.4x Faster Grading</span>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Accuracy Rate</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">{teacherStats.accuracyRate}%</span>
            <span className="text-[10px] text-slate-400 font-semibold">Step-Mark Precision</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Pending Evaluation Rooms & Quick Upload */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pending Evaluation Rooms List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Active Evaluation Rooms</h2>
                <p className="text-xs text-slate-500 font-medium">Select a room to begin AI step-by-step marking</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/rooms/create')}
              >
                + New Room
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map(room => {
                const progressPct = room.totalSheets > 0 ? (room.evaluatedCount / room.totalSheets) * 100 : 0;

                return (
                  <Card key={room.id} hoverable className="space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant={room.status === 'Active' ? 'warning' : 'success'} size="sm">
                            {room.status}
                          </Badge>
                          <h3 className="text-base font-bold text-slate-900 mt-2">{room.roomName}</h3>
                          <p className="text-xs text-slate-500 font-medium">{room.examTitle}</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                          {room.section}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <ProgressBar value={progressPct} color="gold" showLabel />
                        <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                          <span>{room.evaluatedCount} Evaluated</span>
                          <span>{room.pendingCount} Pending</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">{room.questionPaperName}</span>
                      <Button
                        variant="primary"
                        size="sm"
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        onClick={() => {
                          const firstStudent = room.students[0]?.id || 'sheet-1';
                          navigate(`/evaluations/${firstStudent}`);
                        }}
                      >
                        Open Workspace
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Drag-and-Drop Upload Widget */}
          <Card className="space-y-4 border-2 border-dashed border-amber-300 bg-amber-50/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Quick Upload Answer Sheets</h3>
                <p className="text-xs text-slate-600">Drag & drop bulk student answer PDFs to launch instant AI evaluation.</p>
              </div>
            </div>

            <div
              onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={e => { e.preventDefault(); setIsDragOver(false); handleQuickUpload(e); }}
              className={`p-6 rounded-xl border-2 border-dashed text-center transition-all ${
                isDragOver ? 'border-amber-500 bg-amber-100/50' : 'border-slate-300 bg-white'
              }`}
            >
              {quickUploadSuccess ? (
                <div className="py-4 text-emerald-600 font-bold text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Processing uploaded sheets with AI...
                </div>
              ) : (
                <div className="space-y-3">
                  <UploadCloud className="w-8 h-8 text-amber-500 mx-auto" />
                  <div>
                    <p className="text-xs font-bold text-slate-700">Drop PDF files here or browse files</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Supports single & multi-page handwritten student PDFs</p>
                  </div>
                  <Button variant="gold" size="sm" onClick={handleQuickUpload}>
                    Browse Files
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Recently Reviewed Papers & Weekly Statistics */}
        <div className="space-y-8">
          {/* Recently Reviewed Papers Card List */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Recently Reviewed Papers</h2>
            
            <Card padded={false} className="divide-y divide-slate-100">
              {recentlyReviewed.slice(0, 4).map(student => (
                <div key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs">
                      {student.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{student.studentName}</h4>
                      <p className="text-[10px] text-slate-400">Roll: {student.rollNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900">{student.overallScore}/{student.maxScore}</span>
                      <Badge variant={student.status} size="sm" className="block mt-0.5" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/evaluations/${student.id}`)}
                    >
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Weekly Performance Statistics Card */}
          <Card className="space-y-4 bg-slate-900 text-white border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold">Weekly Performance</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">This Week</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">AI Step Precision</span>
                <span className="text-emerald-400 font-bold">94.0%</span>
              </div>
              <ProgressBar value={94} color="emerald" size="sm" />

              <div className="flex justify-between items-center text-xs pt-2">
                <span className="text-slate-400">Avg Speed Per Paper</span>
                <span className="text-amber-400 font-bold">{teacherStats.avgSpeedPerPaper}</span>
              </div>
              <ProgressBar value={85} color="gold" size="sm" />
            </div>

            <div className="pt-2 border-t border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 italic">
                “AI assists. Teachers decide.”
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
