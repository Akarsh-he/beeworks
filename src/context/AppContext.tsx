import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  EvaluationRoom,
  TeacherStats,
  SchoolAnalytics,
  UserProfile,
} from '../types';
import { useAuth } from './AuthContext';
import { api } from '../services/api';
import { toast } from 'sonner';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  rooms: EvaluationRoom[];
  teacherStats: TeacherStats;
  schoolAnalytics: SchoolAnalytics;
  activeRoomId: string;
  setActiveRoomId: (id: string) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  autoSaveStatus: 'Saved' | 'Saving' | 'Unsaved';
  loading: boolean;
  refreshData: () => Promise<void>;
  
  // Actions
  createRoom: (roomData: {
    roomName: string;
    className: string;
    section: string;
    subject: string;
    examTitle: string;
    questionPaperName: string;
    totalSheets: number;
    questionPaperFile?: File;
    rubricText?: string;
  }) => Promise<string>;
  
  updateStepMark: (
    studentId: string,
    questionId: string,
    stepId: string,
    newMarks: number,
    note?: string
  ) => Promise<void>;
  
  approveEvaluation: (studentId: string) => Promise<void>;
  flagEvaluation: (studentId: string, reason: string) => void;
  requestReview: (studentId: string) => void;
  recalculateEvaluation: (studentId: string) => void;
  switchRole: (role: 'Teacher' | 'School Admin') => void;
  deleteRoom: (roomId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();

  const [user, setUser] = useState<UserProfile>(() => ({
    name: authUser?.name || 'Educator',
    email: authUser?.email || '',
    role: (authUser?.role === 'ADMIN' || authUser?.role === 'School Admin') ? 'School Admin' : 'Teacher',
    schoolName: authUser?.schoolName || 'BeeWorks Institution',
  }));

  useEffect(() => {
    if (authUser) {
      setUser({
        name: authUser.name,
        email: authUser.email,
        role: (authUser.role === 'ADMIN' || authUser.role === 'School Admin') ? 'School Admin' : 'Teacher',
        schoolName: authUser.schoolName || 'BeeWorks Institution',
      });
    }
  }, [authUser]);

  const [rooms, setRooms] = useState<EvaluationRoom[]>([]);
  const [teacherStats, setTeacherStats] = useState<TeacherStats>({
    totalRooms: 0,
    evaluationsCompleted: 0,
    timeSavedHours: 0,
    timeSavedMinutes: 0,
    accuracyRate: 98.4,
    avgSpeedPerPaper: '2m 45s'
  });

  const [schoolAnalytics] = useState<SchoolAnalytics>({
    activeTeachers: 12,
    activeRooms: 4,
    activeSubscriptions: 1,
    schoolWideAccuracy: 98.4,
    totalCopiesProcessed: 1280,
    totalEvaluationTimeSaved: '320 hours',
    productivityMultiplier: '2.8x',
    weeklyTrend: [
      { day: 'Mon', count: 120, accuracy: 98 },
      { day: 'Tue', count: 150, accuracy: 99 },
      { day: 'Wed', count: 180, accuracy: 98 },
      { day: 'Thu', count: 210, accuracy: 99 },
      { day: 'Fri', count: 160, accuracy: 98 }
    ],
    institutions: [
      {
        id: 'inst-1',
        schoolName: user.schoolName || 'BeeWorks Institution',
        location: 'New Delhi',
        copiesProcessed: 1280,
        timeSaved: '320h',
        accuracy: 98.4,
        activeTeachers: 12
      }
    ]
  });

  const [activeRoomId, setActiveRoomId] = useState<string>('');
  const [activeStudentId, setActiveStudentId] = useState<string>('');
  const [autoSaveStatus, setAutoSaveStatus] = useState<'Saved' | 'Saving' | 'Unsaved'>('Saved');
  const [loading, setLoading] = useState<boolean>(false);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const [roomsRes, analyticsRes] = await Promise.allSettled([
        api.rooms.getAll(),
        api.analytics.getDashboard(),
      ]);

      if (roomsRes.status === 'fulfilled' && roomsRes.value.success) {
        const fetchedRooms: EvaluationRoom[] = roomsRes.value.rooms.map((r: any) => ({
          id: r.id,
          roomName: r.name,
          className: r.grade || 'Class 10',
          section: 'A',
          subject: r.subject,
          examTitle: r.name,
          questionPaperName: r.questionPaperUrl ? 'Uploaded Question Paper' : 'Standard Rubric Paper',
          totalSheets: r._count?.answerSheets || r.answerSheets?.length || 0,
          evaluatedCount: r.answerSheets?.filter((s: any) => s.status === 'COMPLETED').length || 0,
          pendingCount: r.answerSheets?.filter((s: any) => s.status === 'PENDING' || s.status === 'EVALUATING').length || 0,
          flaggedCount: 0,
          createdAt: new Date(r.createdAt).toLocaleDateString(),
          status: 'Active',
          students: (r.answerSheets || []).map((s: any) => ({
            id: s.id,
            roomId: r.id,
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
              id: st.id,
              questionNumber: st.questionNo || 'Q1',
              questionText: st.stepDescription,
              maxScore: st.maxMarks,
              totalScore: st.awardedMarks,
              pageNumber: 1,
              steps: [
                {
                  id: st.id,
                  stepNumber: 1,
                  title: st.questionNo || 'Step 1',
                  maxMarks: st.maxMarks,
                  awardedMarks: st.awardedMarks,
                  confidence: 'High' as const,
                  reasoning: st.stepFeedback,
                  status: (st.awardedMarks === st.maxMarks ? 'Correct' : st.awardedMarks > 0 ? 'Partial' : 'Incorrect') as any,
                  teacherNote: st.stepFeedback
                }
              ]
            }))
          }))
        }));

        setRooms(fetchedRooms);
        if (fetchedRooms.length > 0 && !activeRoomId) {
          setActiveRoomId(fetchedRooms[0].id);
        }
      }

      if (analyticsRes.status === 'fulfilled' && analyticsRes.value.success) {
        const a = analyticsRes.value.analytics;
        setTeacherStats({
          totalRooms: a.totalRooms || 0,
          evaluationsCompleted: a.completedPapers || 0,
          timeSavedHours: Math.floor(a.totalTimeSavedHours || 0),
          timeSavedMinutes: Math.round(((a.totalTimeSavedHours || 0) % 1) * 60),
          accuracyRate: a.overallAccuracyRate || 98.4,
          avgSpeedPerPaper: '2m 45s'
        });
      }
    } catch (error) {
      console.warn('API sync warning:', error);
    } finally {
      setLoading(false);
    }
  }, [activeRoomId]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const triggerAutoSave = () => {
    setAutoSaveStatus('Saving');
    setTimeout(() => {
      setAutoSaveStatus('Saved');
    }, 600);
  };

  const createRoom = async (roomData: {
    roomName: string;
    className: string;
    section: string;
    subject: string;
    examTitle: string;
    questionPaperName: string;
    totalSheets: number;
    questionPaperFile?: File;
    rubricText?: string;
  }): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('name', roomData.roomName);
      formData.append('subject', roomData.subject);
      formData.append('grade', roomData.className);
      formData.append('rubric', roomData.rubricText || `Grading Rubric for ${roomData.subject} ${roomData.examTitle}`);
      
      if (roomData.questionPaperFile) {
        formData.append('questionPaperFile', roomData.questionPaperFile);
      }

      const res = await api.rooms.create(formData);
      if (res.success && res.room) {
        toast.success('Room created successfully!');
        await refreshData();
        return res.room.id;
      }
      throw new Error(res.message || 'Failed to create room');
    } catch (error: any) {
      const msg = error?.response?.data?.message || error?.message || 'Error creating room';
      toast.error(msg);
      throw error; // re-throw so the caller (RoomCreationPage) stays on page
    }
  };

  const updateStepMark = async (
    studentId: string,
    questionId: string,
    stepId: string,
    newMarks: number,
    note?: string
  ) => {
    try {
      await api.evaluations.overrideStep(stepId, {
        awardedMarks: newMarks,
        stepFeedback: note || 'Teacher manual score update',
      });
      toast.success('Mark updated successfully');
      refreshData();
    } catch (e) {
      toast.error('Failed to update step mark');
    }
    triggerAutoSave();
  };

  const approveEvaluation = async (studentId: string) => {
    try {
      await api.evaluations.approveSheet(studentId);
      toast.success('Evaluation approved successfully');
      refreshData();
    } catch (e) {
      toast.error('Failed to approve evaluation');
    }
    triggerAutoSave();
  };

  const flagEvaluation = (studentId: string, reason: string) => {
    toast.info(`Flagged student sheet: ${reason}`);
    triggerAutoSave();
  };

  const requestReview = (studentId: string) => {
    toast.info('Requested re-review for student evaluation');
    triggerAutoSave();
  };

  const recalculateEvaluation = (studentId: string) => {
    toast.success('Recalculated evaluation score');
    triggerAutoSave();
  };

  const deleteRoom = async (roomId: string) => {
    try {
      await api.rooms.delete(roomId);
      toast.success('Room deleted successfully');
      await refreshData();
    } catch (error: any) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to delete room';
      toast.error(msg);
      throw error;
    }
  };

  const switchRole = (role: 'Teacher' | 'School Admin') => {
    setUser(prev => ({
      ...prev,
      role
    }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        rooms,
        teacherStats,
        schoolAnalytics,
        activeRoomId,
        setActiveRoomId,
        activeStudentId,
        setActiveStudentId,
        autoSaveStatus,
        loading,
        refreshData,
        createRoom,
        updateStepMark,
        approveEvaluation,
        flagEvaluation,
        requestReview,
        recalculateEvaluation,
        switchRole,
        deleteRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
