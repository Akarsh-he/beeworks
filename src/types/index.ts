export type EvaluationStatus = 'Approved' | 'Pending' | 'Review Required' | 'Flagged';

export type StepConfidence = 'High' | 'Medium' | 'Low';

export interface EvaluationStep {
  id: string;
  stepNumber: number;
  title: string;
  maxMarks: number;
  awardedMarks: number;
  confidence: StepConfidence;
  reasoning: string;
  status: 'Correct' | 'Partial' | 'Incorrect';
  teacherNote?: string;
  boundingBox?: {
    x: number; // percentage
    y: number; // percentage
    width: number;
    height: number;
  };
}

export interface QuestionEvaluation {
  id: string;
  questionNumber: string;
  questionText: string;
  maxScore: number;
  totalScore: number;
  steps: EvaluationStep[];
  pageNumber: number;
}

export interface StudentAnswerSheet {
  id: string;
  roomId: string;
  studentName: string;
  rollNumber: string;
  status: EvaluationStatus;
  overallScore: number;
  maxScore: number;
  confidenceRate: number; // 0-100%
  submissionDate: string;
  questions: QuestionEvaluation[];
  pageImages: string[];
  teacherFeedback?: string;
  flagReason?: string;
  timeSpentSeconds: number;
  lastEvaluatedAt?: string;
}

export interface EvaluationRoom {
  id: string;
  roomName: string;
  className: string; // e.g., "Class 10"
  section: string;   // e.g., "A"
  subject: string;   // e.g., "Mathematics"
  examTitle: string; // e.g., "Mid Term Examination 2025"
  questionPaperName: string;
  questionPaperUrl?: string;
  totalSheets: number;
  evaluatedCount: number;
  pendingCount: number;
  flaggedCount: number;
  createdAt: string;
  status: 'Active' | 'Completed' | 'Archived';
  students: StudentAnswerSheet[];
}

export interface TeacherStats {
  totalRooms: number;
  evaluationsCompleted: number;
  timeSavedHours: number;
  timeSavedMinutes: number;
  accuracyRate: number;
  avgSpeedPerPaper: string; // e.g. "2m 45s"
}

export interface InstitutionalOverview {
  id: string;
  schoolName: string;
  location: string;
  copiesProcessed: number;
  timeSaved: string;
  accuracy: number;
  activeTeachers: number;
}

export interface SchoolAnalytics {
  activeTeachers: number;
  activeRooms: number;
  activeSubscriptions: number;
  schoolWideAccuracy: number;
  totalCopiesProcessed: number;
  totalEvaluationTimeSaved: string;
  productivityMultiplier: string;
  weeklyTrend: { day: string; count: number; accuracy: number }[];
  institutions: InstitutionalOverview[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'Teacher' | 'School Admin' | 'System Admin';
  schoolName: string;
  avatar?: string;
}
