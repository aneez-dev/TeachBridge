import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AppState, ClassId, Doubt, QuizAttempt, QuizQuestion, VideoResource } from '../types'
import { CLASSES, CLASS_LIST, TEACHER_CREDENTIAL, initialState } from '../data/mockData'

interface AuthState {
  role: 'teacher' | 'student' | null
  name: string | null
  classId: ClassId | null
}

interface AppContextValue {
  auth: AuthState
  // For teachers, classId is the section they picked (S3/S5) — one shared password.
  // For students, classId is omitted — the class is detected from which section's
  // student password matches.
  login: (role: 'teacher' | 'student', classId: ClassId | undefined, name: string, password: string) => boolean
  logout: () => void
  switchClass: (classId: ClassId) => void
  state: AppState
  currentClass: AppState['classes'][ClassId] | null

  // Topic
  setTopic: (topic: string) => void

  // PDFs
  addPdf: (fileName: string) => void
  removePdf: (id: string) => void

  // Video resources
  generateResources: () => void
  toggleResourceApproval: (id: string) => void
  publishResources: () => void

  // Quiz (full CRUD)
  addQuizQuestion: (q: Omit<QuizQuestion, 'id'>) => void
  updateQuizQuestion: (id: string, q: Omit<QuizQuestion, 'id'>) => void
  deleteQuizQuestion: (id: string) => void
  publishQuiz: () => void

  // Doubts ("Ask Teacher")
  submitDoubt: (question: string) => Doubt
  replyToDoubt: (id: string, reply: string) => void

  // Quiz attempts + attendance
  submitQuizAttempt: (attempt: QuizAttempt) => void
  markPresent: () => void
  toggleRecoveryMode: () => void

  hasCompletedQuiz: boolean
  setHasCompletedQuiz: (v: boolean) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ role: null, name: null, classId: null })
  const [state, setState] = useState<AppState>(initialState)
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false)

  const login = (role: 'teacher' | 'student', classId: ClassId | undefined, name: string, password: string) => {
    if (role === 'teacher') {
      if (password.trim() !== TEACHER_CREDENTIAL.password) return false
      const chosenClass = classId ?? 'S3'
      setAuth({ role, name: name.trim() || TEACHER_CREDENTIAL.displayName, classId: chosenClass })
      setHasCompletedQuiz(false)
      return true
    }

    // Student: auto-detect which class this password belongs to.
    for (const id of CLASS_LIST) {
      const creds = CLASSES[id].student
      if (password.trim() === creds.password) {
        setAuth({ role, name: name.trim() || creds.displayName, classId: id })
        setHasCompletedQuiz(false)
        return true
      }
    }
    return false
  }

  const logout = () => setAuth({ role: null, name: null, classId: null })

  // Demo convenience: a logged-in teacher can hop between their class sections
  // without re-entering a password (mirrors having two independent teacher logins).
  const switchClass = (classId: ClassId) => {
    if (auth.role !== 'teacher') return
    setAuth((a) => ({ ...a, classId }))
  }

  const currentClassId = auth.classId

  const updateClass = (
    classId: ClassId,
    updater: (c: AppState['classes'][ClassId]) => AppState['classes'][ClassId]
  ) => {
    setState((s) => ({
      ...s,
      classes: { ...s.classes, [classId]: updater(s.classes[classId]) },
    }))
  }

  const setTopic = (topic: string) => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({ ...c, classSetup: { ...c.classSetup, topic } }))
  }

  const addPdf = (fileName: string) => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({
      ...c,
      classSetup: {
        ...c.classSetup,
        pdfs: [
          ...c.classSetup.pdfs,
          { id: `pdf-${Date.now()}`, name: fileName, uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ],
      },
    }))
  }

  const removePdf = (id: string) => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({
      ...c,
      classSetup: { ...c.classSetup, pdfs: c.classSetup.pdfs.filter((p) => p.id !== id) },
    }))
  }

  const generateResources = () => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({ ...c, classSetup: { ...c.classSetup, resourcesGenerated: true } }))
  }

  const toggleResourceApproval = (id: string) => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({
      ...c,
      classSetup: {
        ...c.classSetup,
        resources: c.classSetup.resources.map((r: VideoResource) => (r.id === id ? { ...r, approved: !r.approved } : r)),
      },
    }))
  }

  const publishResources = () => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({ ...c, classSetup: { ...c.classSetup, resourcesPublished: true } }))
  }

  const addQuizQuestion = (q: Omit<QuizQuestion, 'id'>) => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({
      ...c,
      classSetup: {
        ...c.classSetup,
        quizGenerated: true,
        quiz: [...c.classSetup.quiz, { ...q, id: `q-${Date.now()}` }],
      },
    }))
  }

  const updateQuizQuestion = (id: string, q: Omit<QuizQuestion, 'id'>) => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({
      ...c,
      classSetup: {
        ...c.classSetup,
        quiz: c.classSetup.quiz.map((existing) => (existing.id === id ? { ...q, id } : existing)),
      },
    }))
  }

  const deleteQuizQuestion = (id: string) => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({
      ...c,
      classSetup: { ...c.classSetup, quiz: c.classSetup.quiz.filter((q) => q.id !== id) },
    }))
  }

  const publishQuiz = () => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({ ...c, classSetup: { ...c.classSetup, quizPublished: true } }))
  }

  const submitDoubt = (question: string): Doubt => {
    const newDoubt: Doubt = {
      id: `d-${Date.now()}`,
      studentName: auth.name || 'Student',
      initials: (auth.name || 'ST').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      question,
      status: 'pending',
    }
    if (currentClassId) {
      updateClass(currentClassId, (c) => ({ ...c, doubts: [newDoubt, ...c.doubts] }))
    }
    return newDoubt
  }

  const replyToDoubt = (id: string, reply: string) => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({
      ...c,
      doubts: c.doubts.map((d) => (d.id === id ? { ...d, status: 'answered', teacherReply: reply } : d)),
    }))
  }

  const submitQuizAttempt = (attempt: QuizAttempt) => {
    if (currentClassId) {
      updateClass(currentClassId, (c) => ({ ...c, attempts: [attempt, ...c.attempts] }))
    }
    setHasCompletedQuiz(true)
  }

  const markPresent = () => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({
      ...c,
      attendance: { present: c.attendance.present + 1, total: c.attendance.total },
    }))
  }

  const toggleRecoveryMode = () => {
    if (!currentClassId) return
    updateClass(currentClassId, (c) => ({ ...c, recoveryMode: !c.recoveryMode }))
  }

  const currentClass = currentClassId ? state.classes[currentClassId] : null

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      switchClass,
      state,
      currentClass,
      setTopic,
      addPdf,
      removePdf,
      generateResources,
      toggleResourceApproval,
      publishResources,
      addQuizQuestion,
      updateQuizQuestion,
      deleteQuizQuestion,
      publishQuiz,
      submitDoubt,
      replyToDoubt,
      submitQuizAttempt,
      markPresent,
      toggleRecoveryMode,
      hasCompletedQuiz,
      setHasCompletedQuiz,
    }),
    [auth, state, hasCompletedQuiz]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export { CLASSES, CLASS_LIST }
