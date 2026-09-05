export type Role = 'teacher' | 'student'

export type ClassId = 'S3' | 'S5'

export type DoubtStatus = 'pending' | 'answered'

export interface Doubt {
  id: string
  studentName: string
  initials: string
  time: string
  question: string
  status: DoubtStatus
  teacherReply?: string
}

export interface VideoResource {
  id: string
  title: string
  url: string
  channel: string
  approved: boolean
}

export interface PdfResource {
  id: string
  name: string
  uploadedAt: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export interface QuizAttempt {
  studentName: string
  initials: string
  score: number
  total: number
  time: string
  result: 'Good understanding' | 'Partial understanding' | 'Needs improvement'
}

export interface ClassSetup {
  topic: string
  topicOptions: string[]
  pdfs: PdfResource[]
  resourcesGenerated: boolean
  resources: VideoResource[]
  resourcesPublished: boolean
  quizGenerated: boolean
  quiz: QuizQuestion[]
  quizPublished: boolean
}

export interface ClassState {
  classId: ClassId
  label: string
  subject: string
  classSetup: ClassSetup
  doubts: Doubt[]
  attempts: QuizAttempt[]
  attendance: { present: number; total: number }
  recoveryMode: boolean
}

export interface AppState {
  classes: Record<ClassId, ClassState>
}
