import { EvaluationRoom, StudentAnswerSheet, TeacherStats, SchoolAnalytics, UserProfile } from '../types';

export const initialUserProfile: UserProfile = {
  name: "Priya Sharma",
  email: "priya.sharma@dps.edu.in",
  role: "Teacher",
  schoolName: "Delhi Public School, R.K. Puram",
};

export const initialTeacherStats: TeacherStats = {
  totalRooms: 24,
  evaluationsCompleted: 56,
  timeSavedHours: 6,
  timeSavedMinutes: 24,
  accuracyRate: 93.6,
  avgSpeedPerPaper: "2m 45s",
};

export const initialStudentAnswerSheets: StudentAnswerSheet[] = [
  {
    id: "sheet-1",
    roomId: "room-101",
    studentName: "Aarav Sharma",
    rollNumber: "10A-01",
    status: "Approved",
    overallScore: 28,
    maxScore: 32,
    confidenceRate: 98,
    submissionDate: "2025-10-14 09:30 AM",
    timeSpentSeconds: 145,
    lastEvaluatedAt: "2025-10-14 10:15 AM",
    teacherFeedback: "Great step execution! Minor arithmetic slip in Question 3b.",
    pageImages: ["/mock_sheets/math_p1.svg"],
    questions: [
      {
        id: "q-1",
        questionNumber: "Q1",
        questionText: "Solve the quadratic equation: 2x² - 5x - 3 = 0 for x.",
        maxScore: 6,
        totalScore: 6,
        pageNumber: 1,
        steps: [
          {
            id: "step-1-1",
            stepNumber: 1,
            title: "Standard Form & Coefficients",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Identified quadratic form correctly with a = 2, b = -5, c = -3.",
            boundingBox: { x: 12, y: 18, width: 76, height: 10 }
          },
          {
            id: "step-1-2",
            stepNumber: 2,
            title: "Formula Stated",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Stated quadratic formula x = (-b ± √(b² - 4ac)) / 2a correctly.",
            boundingBox: { x: 12, y: 30, width: 76, height: 11 }
          },
          {
            id: "step-1-3",
            stepNumber: 3,
            title: "Substitution",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Substituted values: x = (-(-5) ± √((-5)² - 4(2)(-3))) / (2*2).",
            boundingBox: { x: 12, y: 43, width: 76, height: 12 }
          },
          {
            id: "step-1-4",
            stepNumber: 4,
            title: "Discriminant Calculation",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Discriminant Δ = 25 + 24 = 49. Correct simplification.",
            boundingBox: { x: 12, y: 57, width: 76, height: 10 }
          },
          {
            id: "step-1-5",
            stepNumber: 5,
            title: "Root Simplification",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "x = (5 ± 7) / 4 yielding x₁ = 12/4 = 3.",
            boundingBox: { x: 12, y: 69, width: 76, height: 10 }
          },
          {
            id: "step-1-6",
            stepNumber: 6,
            title: "Final Answer Statement",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "x₂ = -2/4 = -1/2. Roots x = 3 and x = -1/2 correctly highlighted.",
            boundingBox: { x: 12, y: 81, width: 76, height: 12 }
          }
        ]
      },
      {
        id: "q-2",
        questionNumber: "Q2",
        questionText: "Find the 15th term of the Arithmetic Progression: 5, 9, 13, 17...",
        maxScore: 3,
        totalScore: 3,
        pageNumber: 1,
        steps: [
          {
            id: "step-2-1",
            stepNumber: 1,
            title: "First term and Common Difference",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Identified a = 5, d = 9 - 5 = 4.",
            boundingBox: { x: 12, y: 15, width: 76, height: 12 }
          },
          {
            id: "step-2-2",
            stepNumber: 2,
            title: "AP nth term formula",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "a₁₅ = a + (15 - 1)d = 5 + 14(4).",
            boundingBox: { x: 12, y: 35, width: 76, height: 12 }
          },
          {
            id: "step-2-3",
            stepNumber: 3,
            title: "Final Answer",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "a₁₅ = 5 + 56 = 61.",
            boundingBox: { x: 12, y: 55, width: 76, height: 12 }
          }
        ]
      }
    ]
  },
  {
    id: "sheet-2",
    roomId: "room-101",
    studentName: "Diya Patel",
    rollNumber: "10A-02",
    status: "Review Required",
    overallScore: 26,
    maxScore: 32,
    confidenceRate: 74,
    submissionDate: "2025-10-14 09:32 AM",
    timeSpentSeconds: 210,
    lastEvaluatedAt: "2025-10-14 10:22 AM",
    teacherFeedback: "Check calculation in Step 4 discriminant sign rule.",
    pageImages: ["/mock_sheets/math_p1.svg"],
    questions: [
      {
        id: "q-1-diya",
        questionNumber: "Q1",
        questionText: "Solve the quadratic equation: 2x² - 5x - 3 = 0 for x.",
        maxScore: 6,
        totalScore: 4.5,
        pageNumber: 1,
        steps: [
          {
            id: "step-d-1",
            stepNumber: 1,
            title: "Standard Form & Coefficients",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Identified a=2, b=-5, c=-3.",
            boundingBox: { x: 12, y: 18, width: 76, height: 10 }
          },
          {
            id: "step-d-2",
            stepNumber: 2,
            title: "Formula Stated",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Formula correctly written.",
            boundingBox: { x: 12, y: 30, width: 76, height: 11 }
          },
          {
            id: "step-d-3",
            stepNumber: 3,
            title: "Substitution",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Substituted correctly into quadratic equation.",
            boundingBox: { x: 12, y: 43, width: 76, height: 12 }
          },
          {
            id: "step-d-4",
            stepNumber: 4,
            title: "Discriminant Calculation",
            maxMarks: 1,
            awardedMarks: 0.5,
            confidence: "Medium",
            status: "Partial",
            reasoning: "Sign error in multiplication (-4 * 2 * -3). Wrote Δ = 25 - 24 instead of +24.",
            teacherNote: "Check calculation: -4 × 2 × (-3) = +24",
            boundingBox: { x: 12, y: 57, width: 76, height: 10 }
          },
          {
            id: "step-d-5",
            stepNumber: 5,
            title: "Root Simplification",
            maxMarks: 1,
            awardedMarks: 0,
            confidence: "Low",
            status: "Incorrect",
            reasoning: "Carried forward erroneous Δ = 1, resulting in wrong root x = 1.5.",
            boundingBox: { x: 12, y: 69, width: 76, height: 10 }
          },
          {
            id: "step-d-6",
            stepNumber: 6,
            title: "Final Answer Statement",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "Medium",
            status: "Correct",
            reasoning: "Awarded method mark for completing calculation flow despite previous arithmetic error.",
            boundingBox: { x: 12, y: 81, width: 76, height: 12 }
          }
        ]
      }
    ]
  },
  {
    id: "sheet-3",
    roomId: "room-101",
    studentName: "Ananya Rao",
    rollNumber: "10A-03",
    status: "Pending",
    overallScore: 30,
    maxScore: 32,
    confidenceRate: 95,
    submissionDate: "2025-10-14 09:35 AM",
    timeSpentSeconds: 120,
    pageImages: ["/mock_sheets/math_p1.svg"],
    questions: [
      {
        id: "q-1-ananya",
        questionNumber: "Q1",
        questionText: "Solve the quadratic equation: 2x² - 5x - 3 = 0 for x.",
        maxScore: 6,
        totalScore: 6,
        pageNumber: 1,
        steps: [
          {
            id: "step-a-1",
            stepNumber: 1,
            title: "Standard Form & Coefficients",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Clean identification of coefficients.",
            boundingBox: { x: 12, y: 18, width: 76, height: 10 }
          },
          {
            id: "step-a-2",
            stepNumber: 2,
            title: "Formula Stated",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Formula properly written.",
            boundingBox: { x: 12, y: 30, width: 76, height: 11 }
          },
          {
            id: "step-a-3",
            stepNumber: 3,
            title: "Substitution",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Exact value substitution.",
            boundingBox: { x: 12, y: 43, width: 76, height: 12 }
          },
          {
            id: "step-a-4",
            stepNumber: 4,
            title: "Discriminant Calculation",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Evaluated 25 + 24 = 49 flawlessly.",
            boundingBox: { x: 12, y: 57, width: 76, height: 10 }
          },
          {
            id: "step-a-5",
            stepNumber: 5,
            title: "Root Simplification",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "Simplification step verified.",
            boundingBox: { x: 12, y: 69, width: 76, height: 10 }
          },
          {
            id: "step-a-6",
            stepNumber: 6,
            title: "Final Answer Statement",
            maxMarks: 1,
            awardedMarks: 1,
            confidence: "High",
            status: "Correct",
            reasoning: "x = 3 and x = -1/2 framed with box.",
            boundingBox: { x: 12, y: 81, width: 76, height: 12 }
          }
        ]
      }
    ]
  },
  {
    id: "sheet-4",
    roomId: "room-101",
    studentName: "Rohan Mehta",
    rollNumber: "10A-04",
    status: "Pending",
    overallScore: 22,
    maxScore: 32,
    confidenceRate: 88,
    submissionDate: "2025-10-14 09:38 AM",
    timeSpentSeconds: 160,
    pageImages: ["/mock_sheets/math_p1.svg"],
    questions: []
  },
  {
    id: "sheet-5",
    roomId: "room-101",
    studentName: "Kabir Das",
    rollNumber: "10A-05",
    status: "Flagged",
    overallScore: 18,
    maxScore: 32,
    confidenceRate: 45,
    submissionDate: "2025-10-14 09:40 AM",
    flagReason: "Unclear handwriting on Page 2 & missing steps in Q4.",
    timeSpentSeconds: 310,
    pageImages: ["/mock_sheets/math_p1.svg"],
    questions: []
  }
];

export const initialRooms: EvaluationRoom[] = [
  {
    id: "room-101",
    roomName: "Room 101 – Mathematics",
    className: "Class 10",
    section: "A",
    subject: "Mathematics",
    examTitle: "Mid Term Examination 2025",
    questionPaperName: "Maths Mid Term 2025 QP.pdf",
    totalSheets: 32,
    evaluatedCount: 18,
    pendingCount: 12,
    flaggedCount: 2,
    createdAt: "2025-10-14",
    status: "Active",
    students: initialStudentAnswerSheets
  },
  {
    id: "room-102",
    roomName: "Room 102 – Mathematics",
    className: "Class 10",
    section: "B",
    subject: "Mathematics",
    examTitle: "Algebra Unit Test 3",
    questionPaperName: "Algebra_UT3_QuestionPaper.pdf",
    totalSheets: 28,
    evaluatedCount: 28,
    pendingCount: 0,
    flaggedCount: 0,
    createdAt: "2025-10-10",
    status: "Completed",
    students: []
  },
  {
    id: "room-103",
    roomName: "Room 103 – Mathematics",
    className: "Class 9",
    section: "A",
    subject: "Mathematics",
    examTitle: "Geometry & Theorems Test",
    questionPaperName: "Geometry_Class9_Paper.pdf",
    totalSheets: 35,
    evaluatedCount: 10,
    pendingCount: 24,
    flaggedCount: 1,
    createdAt: "2025-10-12",
    status: "Active",
    students: []
  }
];

export const initialSchoolAnalytics: SchoolAnalytics = {
  activeTeachers: 72,
  activeRooms: 28,
  activeSubscriptions: 14,
  schoolWideAccuracy: 93.6,
  totalCopiesProcessed: 18432,
  totalEvaluationTimeSaved: "64h 32m",
  productivityMultiplier: "2.4x",
  weeklyTrend: [
    { day: "Mon", count: 1240, accuracy: 94.2 },
    { day: "Tue", count: 1850, accuracy: 93.8 },
    { day: "Wed", count: 2400, accuracy: 95.1 },
    { day: "Thu", count: 3100, accuracy: 93.4 },
    { day: "Fri", count: 2950, accuracy: 94.8 },
    { day: "Sat", count: 1600, accuracy: 92.9 },
    { day: "Sun", count: 850, accuracy: 96.0 },
  ],
  institutions: [
    {
      id: "sch-1",
      schoolName: "Delhi Public School, R.K. Puram",
      location: "New Delhi",
      copiesProcessed: 6420,
      timeSaved: "142h 10m",
      accuracy: 94.8,
      activeTeachers: 24,
    },
    {
      id: "sch-2",
      schoolName: "Greenfield High School",
      location: "Bengaluru",
      copiesProcessed: 4890,
      timeSaved: "108h 45m",
      accuracy: 93.2,
      activeTeachers: 18,
    },
    {
      id: "sch-3",
      schoolName: "Riverside Public School",
      location: "Mumbai",
      copiesProcessed: 3750,
      timeSaved: "82h 15m",
      accuracy: 92.9,
      activeTeachers: 14,
    },
    {
      id: "sch-4",
      schoolName: "Sunrise International School",
      location: "Hyderabad",
      copiesProcessed: 3372,
      timeSaved: "75h 30m",
      accuracy: 94.1,
      activeTeachers: 16,
    }
  ]
};

export const trustSchoolLogos = [
  { name: "Delhi Public School", abbr: "DPS" },
  { name: "National Public School", abbr: "NPS" },
  { name: "Oakridge International", abbr: "OAK" },
  { name: "Pathways World School", abbr: "PWS" },
  { name: "Orchids International", abbr: "OIS" }
];
