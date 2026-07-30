import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EvaluationRoom,
  StudentAnswerSheet,
  TeacherStats,
  SchoolAnalytics,
  UserProfile,
  EvaluationStep
} from '../types';
import {
  initialRooms,
  initialTeacherStats,
  initialSchoolAnalytics,
  initialUserProfile
} from '../mock/mockData';

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
  
  // Actions
  createRoom: (roomData: {
    roomName: string;
    className: string;
    section: string;
    subject: string;
    examTitle: string;
    questionPaperName: string;
    totalSheets: number;
  }) => string;
  
  updateStepMark: (
    studentId: string,
    questionId: string,
    stepId: string,
    newMarks: number,
    note?: string
  ) => void;
  
  approveEvaluation: (studentId: string) => void;
  flagEvaluation: (studentId: string, reason: string) => void;
  requestReview: (studentId: string) => void;
  recalculateEvaluation: (studentId: string) => void;
  switchRole: (role: 'Teacher' | 'School Admin') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'beeworks_app_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_user');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [rooms, setRooms] = useState<EvaluationRoom[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_rooms');
    return saved ? JSON.parse(saved) : initialRooms;
  });

  const [teacherStats, setTeacherStats] = useState<TeacherStats>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_stats');
    return saved ? JSON.parse(saved) : initialTeacherStats;
  });

  const [schoolAnalytics] = useState<SchoolAnalytics>(initialSchoolAnalytics);

  const [activeRoomId, setActiveRoomId] = useState<string>("room-101");
  const [activeStudentId, setActiveStudentId] = useState<string>("sheet-1");
  const [autoSaveStatus, setAutoSaveStatus] = useState<'Saved' | 'Saving' | 'Unsaved'>('Saved');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_stats', JSON.stringify(teacherStats));
  }, [teacherStats]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_user', JSON.stringify(user));
  }, [user]);

  // Actions
  const triggerAutoSave = () => {
    setAutoSaveStatus('Saving');
    setTimeout(() => {
      setAutoSaveStatus('Saved');
    }, 600);
  };

  const createRoom = (roomData: {
    roomName: string;
    className: string;
    section: string;
    subject: string;
    examTitle: string;
    questionPaperName: string;
    totalSheets: number;
  }): string => {
    const newRoomId = `room-${Date.now().toString().slice(-4)}`;
    
    // Generate synthetic student list
    const mockStudents: StudentAnswerSheet[] = Array.from({ length: roomData.totalSheets }).map((_, idx) => ({
      id: `sheet-${newRoomId}-${idx + 1}`,
      roomId: newRoomId,
      studentName: `Student ${idx + 1}`,
      rollNumber: `${roomData.className.replace(/\s+/g, '')}-${(idx + 1).toString().padStart(2, '0')}`,
      status: 'Pending',
      overallScore: Math.floor(Math.random() * 8) + 24,
      maxScore: 32,
      confidenceRate: Math.floor(Math.random() * 15) + 85,
      submissionDate: new Date().toLocaleDateString() + ' 09:00 AM',
      timeSpentSeconds: 0,
      pageImages: ["/mock_sheets/math_p1.svg"],
      questions: initialRooms[0].students[0].questions
    }));

    const newRoom: EvaluationRoom = {
      id: newRoomId,
      roomName: roomData.roomName || `Room ${newRoomId.slice(-3)} – ${roomData.subject}`,
      className: roomData.className,
      section: roomData.section,
      subject: roomData.subject,
      examTitle: roomData.examTitle,
      questionPaperName: roomData.questionPaperName,
      totalSheets: roomData.totalSheets,
      evaluatedCount: 0,
      pendingCount: roomData.totalSheets,
      flaggedCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Active',
      students: mockStudents
    };

    setRooms(prev => [newRoom, ...prev]);
    setTeacherStats(prev => ({
      ...prev,
      totalRooms: prev.totalRooms + 1
    }));

    triggerAutoSave();
    return newRoomId;
  };

  const updateStepMark = (
    studentId: string,
    questionId: string,
    stepId: string,
    newMarks: number,
    note?: string
  ) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        const studentIndex = room.students.findIndex(s => s.id === studentId);
        if (studentIndex === -1) return room;

        const updatedStudents = [...room.students];
        const student = { ...updatedStudents[studentIndex] };
        
        student.questions = student.questions.map(q => {
          if (q.id !== questionId) return q;

          const updatedSteps = q.steps.map(step => {
            if (step.id !== stepId) return step;
            
            const updatedStatus: EvaluationStep['status'] = 
              newMarks === step.maxMarks ? 'Correct' : newMarks > 0 ? 'Partial' : 'Incorrect';

            return {
              ...step,
              awardedMarks: newMarks,
              status: updatedStatus,
              teacherNote: note !== undefined ? note : step.teacherNote
            };
          });

          const newQTotal = updatedSteps.reduce((acc, s) => acc + s.awardedMarks, 0);
          return {
            ...q,
            steps: updatedSteps,
            totalScore: newQTotal
          };
        });

        // Recalculate student total score
        const newOverall = student.questions.reduce((acc, q) => acc + q.totalScore, 0);
        student.overallScore = newOverall;
        student.status = 'Pending'; // Mark as pending until approved

        updatedStudents[studentIndex] = student;
        return { ...room, students: updatedStudents };
      })
    );

    triggerAutoSave();
  };

  const approveEvaluation = (studentId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        const studentIndex = room.students.findIndex(s => s.id === studentId);
        if (studentIndex === -1) return room;

        const updatedStudents = [...room.students];
        const student = { ...updatedStudents[studentIndex], status: 'Approved' as const, lastEvaluatedAt: new Date().toLocaleTimeString() };
        updatedStudents[studentIndex] = student;

        const evaluatedCount = updatedStudents.filter(s => s.status === 'Approved').length;
        const pendingCount = updatedStudents.filter(s => s.status === 'Pending' || s.status === 'Review Required').length;
        const flaggedCount = updatedStudents.filter(s => s.status === 'Flagged').length;

        return {
          ...room,
          evaluatedCount,
          pendingCount,
          flaggedCount,
          students: updatedStudents
        };
      })
    );

    setTeacherStats(prev => ({
      ...prev,
      evaluationsCompleted: prev.evaluationsCompleted + 1
    }));

    triggerAutoSave();
  };

  const flagEvaluation = (studentId: string, reason: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        const studentIndex = room.students.findIndex(s => s.id === studentId);
        if (studentIndex === -1) return room;

        const updatedStudents = [...room.students];
        updatedStudents[studentIndex] = {
          ...updatedStudents[studentIndex],
          status: 'Flagged',
          flagReason: reason
        };

        const evaluatedCount = updatedStudents.filter(s => s.status === 'Approved').length;
        const pendingCount = updatedStudents.filter(s => s.status === 'Pending' || s.status === 'Review Required').length;
        const flaggedCount = updatedStudents.filter(s => s.status === 'Flagged').length;

        return {
          ...room,
          evaluatedCount,
          pendingCount,
          flaggedCount,
          students: updatedStudents
        };
      })
    );
    triggerAutoSave();
  };

  const requestReview = (studentId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        const studentIndex = room.students.findIndex(s => s.id === studentId);
        if (studentIndex === -1) return room;

        const updatedStudents = [...room.students];
        updatedStudents[studentIndex] = {
          ...updatedStudents[studentIndex],
          status: 'Review Required'
        };

        return { ...room, students: updatedStudents };
      })
    );
    triggerAutoSave();
  };

  const recalculateEvaluation = (studentId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        const studentIndex = room.students.findIndex(s => s.id === studentId);
        if (studentIndex === -1) return room;

        const updatedStudents = [...room.students];
        const student = { ...updatedStudents[studentIndex] };
        
        student.questions = student.questions.map(q => {
          const total = q.steps.reduce((sum, st) => sum + st.awardedMarks, 0);
          return { ...q, totalScore: total };
        });

        student.overallScore = student.questions.reduce((sum, q) => sum + q.totalScore, 0);
        updatedStudents[studentIndex] = student;

        return { ...room, students: updatedStudents };
      })
    );
    triggerAutoSave();
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
        createRoom,
        updateStepMark,
        approveEvaluation,
        flagEvaluation,
        requestReview,
        recalculateEvaluation,
        switchRole
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
