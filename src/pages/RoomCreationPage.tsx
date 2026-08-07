import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  FolderPlus,
  FileText,
  UploadCloud,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

export const RoomCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { createRoom, refreshData } = useApp();

  const [className, setClassName] = useState<string>('Class 10');
  const [section, setSection] = useState<string>('A');
  const [examTitle, setExamTitle] = useState<string>('Mid Term Examination 2025');
  const [subject, setSubject] = useState<string>('Mathematics');

  const [questionPaperFile, setQuestionPaperFile] = useState<File | null>(null);
  const [studentAnswerFiles, setStudentAnswerFiles] = useState<{ name: string; size: string; file?: File }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleQPFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast.error('Question paper must be a PDF file. Please select a valid PDF.');
        e.target.value = '';
        return;
      }
      setQuestionPaperFile(file);
    }
  };

  const handleStudentFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        file: f,
      }));
      setStudentAnswerFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const qpName = questionPaperFile ? questionPaperFile.name : 'Maths_MidTerm_QP.pdf';
      const newRoomId = await createRoom({
        roomName: `Room ${className.replace(/\s+/g, '')}${section} – ${subject}`,
        className,
        section,
        subject,
        examTitle,
        questionPaperName: qpName,
        totalSheets: studentAnswerFiles.length || 1,
        questionPaperFile: questionPaperFile || undefined,
        rubricText: `Standard Marking Rubric for ${subject} ${examTitle} (${className})`,
      });

      // Upload each student answer sheet to the newly created room
      if (studentAnswerFiles.length > 0) {
        let uploaded = 0;
        for (const sheet of studentAnswerFiles) {
          if (!sheet.file) continue;
          try {
            const fd = new FormData();
            // Derive student name from filename; ensure >= 2 chars for backend validation
            let studentName = sheet.name.replace(/\.[^/.]+$/, '').replace(/[_\-]+/g, ' ').trim();
            if (studentName.length < 2) studentName = `Student ${uploaded + 1}`;
            fd.append('studentName', studentName);
            fd.append('file', sheet.file);
            await api.rooms.uploadAnswerSheet(newRoomId, fd);
            uploaded++;
          } catch (sheetErr: any) {
            console.error(`Failed to upload ${sheet.name}:`, sheetErr);
            toast.error(`Failed to upload ${sheet.name}: ${sheetErr?.response?.data?.message || sheetErr?.message || 'unknown error'}`);
          }
        }
        if (uploaded > 0) {
          toast.success(`${uploaded} answer sheet${uploaded > 1 ? 's' : ''} uploaded successfully!`);
        }
        // Re-fetch rooms so the dashboard shows the uploaded sheets immediately
        await refreshData();
      }

      setIsSubmitting(false);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Error creating evaluation room.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Title Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Step 1 of 2 • Evaluation Room Setup</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create New Evaluation Room</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Configure room parameters and upload question papers and handwritten student answer sheets.
          </p>
        </div>

        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Form Step 1: Room Details */}
        <Card className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FolderPlus className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Room Details & Curriculum Info</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select
              label="Class / Grade Level"
              options={[
                { value: 'Class 10', label: 'Class 10 (Grade 10)' },
                { value: 'Class 9', label: 'Class 9 (Grade 9)' },
                { value: 'Class 11', label: 'Class 11 (Grade 11)' },
                { value: 'Class 12', label: 'Class 12 (Grade 12)' },
              ]}
              value={className}
              onChange={e => setClassName(e.target.value)}
              required
            />

            <Select
              label="Section"
              options={[
                { value: 'A', label: 'Section A' },
                { value: 'B', label: 'Section B' },
                { value: 'C', label: 'Section C' },
                { value: 'D', label: 'Section D' },
              ]}
              value={section}
              onChange={e => setSection(e.target.value)}
              required
            />

            <Input
              label="Exam / Test Title"
              type="text"
              placeholder="e.g. Mid Term Examination 2025"
              value={examTitle}
              onChange={e => setExamTitle(e.target.value)}
              required
            />

            <Select
              label="Subject"
              options={[
                { value: 'Mathematics', label: 'Mathematics' },
                { value: 'Physics', label: 'Physics' },
                { value: 'Chemistry', label: 'Chemistry' },
                { value: 'Biology', label: 'Biology' },
              ]}
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>
        </Card>

        {/* Form Step 2: File Uploads */}
        <Card className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileText className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Upload Examination Files</h2>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              1. Upload Question Paper (PDF)
            </label>
            <p className="text-xs text-slate-500">
              AI analyzes question structure, marks scheme, and model solution.
            </p>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-400 bg-slate-50/50 transition-colors">
              {questionPaperFile ? (
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-bold text-slate-900">{questionPaperFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuestionPaperFile(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Select Question Paper PDF</p>
                  <label className="inline-block">
                    <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
                      Choose Question Paper PDF
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleQPFileChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-sm font-semibold text-slate-800">
              2. Upload Student Answer Sheets (Bulk or Individual PDFs)
            </label>
            <p className="text-xs text-slate-500">
              Bulk upload single multi-page PDF or individual PDFs per student. Auto-detects student names & roll numbers.
            </p>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-400 bg-slate-50/50 transition-colors">
              <div className="space-y-3">
                <UploadCloud className="w-8 h-8 text-amber-500 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Drag and drop student answer sheet files here</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Supports scanned JPGs, PNGs, and multi-page PDFs</p>
                </div>
                <label className="inline-block">
                  <span className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold shadow cursor-pointer hover:bg-slate-800">
                    Select Answer Sheet Files
                  </span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.png"
                    className="hidden"
                    onChange={handleStudentFilesChange}
                  />
                </label>
              </div>

              {studentAnswerFiles.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200 text-left space-y-2">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    Uploaded Batches ({studentAnswerFiles.length})
                  </span>
                  {studentAnswerFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-slate-800">{file.name}</span>
                        <span className="text-[10px] text-slate-400">({file.size})</span>
                      </div>
                      <Badge variant="success" size="sm">Ready for AI</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Bottom Action Bar */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            type="button"
            className="w-full sm:w-auto min-h-[44px]"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button
            variant="gold"
            size="lg"
            type="submit"
            isLoading={isSubmitting}
            className="w-full sm:w-auto font-extrabold text-slate-950 px-8 shadow-xl shadow-amber-500/20 min-h-[44px]"
            rightIcon={<ArrowRight className="w-5 h-5 text-slate-950" />}
          >
            Create Room & Launch AI Evaluation
          </Button>
        </div>
      </form>
    </div>
  );
};
