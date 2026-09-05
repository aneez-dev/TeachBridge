import { useState } from 'react'
import { Youtube, CheckCircle2, MessageCircle, FileText, CircleCheck, Lock } from 'lucide-react'
import { Header } from '../components/Header'
import { useApp } from '../context/AppContext'

export function StudentPage() {
  const { currentClass, submitQuizAttempt, markPresent, submitDoubt, auth, hasCompletedQuiz } = useApp()

  if (!currentClass) return null
  const { classSetup } = currentClass

  const approvedResources = classSetup.resources.filter((r) => r.approved)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(hasCompletedQuiz)
  const [quizResult, setQuizResult] = useState<{ score: number; total: number; label: string } | null>(null)

  const [markedPresent, setMarkedPresent] = useState(false)

  const [doubt, setDoubt] = useState('')
  const [doubtSent, setDoubtSent] = useState(false)
  const [error, setError] = useState('')

  const handleSelect = (qId: string, optionIndex: number) => {
    setAnswers((a) => ({ ...a, [qId]: optionIndex }))
  }

  const handleQuizSubmit = () => {
    if (Object.keys(answers).length < classSetup.quiz.length) {
      setError('Please answer every question before submitting.')
      return
    }
    setError('')
    const score = classSetup.quiz.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
      0
    )
    const total = classSetup.quiz.length
    const ratio = score / total
    const label = ratio >= 0.75 ? 'Good understanding' : ratio >= 0.4 ? 'Partial understanding' : 'Needs improvement'

    submitQuizAttempt({
      studentName: auth.name || 'Student',
      initials: (auth.name || 'ST').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
      score,
      total,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      result: label as 'Good understanding' | 'Partial understanding' | 'Needs improvement',
    })
    setQuizResult({ score, total, label })
    setQuizSubmitted(true)
  }

  const canCheckIn = classSetup.quizPublished && quizSubmitted

  const handlePresent = () => {
    if (!canCheckIn || markedPresent) return
    markPresent()
    setMarkedPresent(true)
  }

  const handleDoubtSubmit = () => {
    if (!doubt.trim()) return
    submitDoubt(doubt.trim())
    setDoubt('')
    setDoubtSent(true)
  }

  return (
    <div className="min-h-screen bg-cloud pb-16">
      <Header />

      <main className="max-w-2xl mx-auto px-5 md:px-0 pt-8 space-y-6">
        <div>
          <p className="label mb-1.5">Today's class</p>
          <h1 className="font-display text-2xl mb-1.5">{classSetup.topic}</h1>
          <p className="text-sm text-ink/55">Review the material below, then take the short quiz.</p>
        </div>

        {/* Learning material */}
        <section className="card p-5">
          <p className="label mb-3">Learning resources</p>
          {classSetup.pdfs.length > 0 && (
            <div className="space-y-1.5 mb-3">
              {classSetup.pdfs.map((p) => (
                <div key={p.id} className="flex items-center gap-2.5 border border-rule rounded-lg px-3 py-2 text-sm bg-white">
                  <FileText className="w-4 h-4 text-teal-dark shrink-0" />
                  <span className="truncate">{p.name}</span>
                </div>
              ))}
            </div>
          )}
          <div className="space-y-2.5">
            {approvedResources.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 border border-rule rounded-xl px-3.5 py-3 hover:border-teal-line hover:bg-teal-soft/40"
              >
                <span className="w-9 h-9 rounded-lg bg-apricot-soft flex items-center justify-center shrink-0">
                  <Youtube className="w-4 h-4 text-apricot" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{r.title}</p>
                  <p className="text-xs text-ink/45">{r.channel}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="card p-5">
          <p className="label mb-3">Understanding check</p>

          {!classSetup.quizPublished ? (
            <p className="text-sm text-ink/50 bg-cloud rounded-lg px-3.5 py-3 border border-dashed border-rule">
              Your teacher hasn't assigned today's quiz yet. Check back shortly.
            </p>
          ) : !quizSubmitted ? (
            <div className="space-y-4">
              {classSetup.quiz.map((q, i) => (
                <div key={q.id}>
                  <p className="text-sm font-medium text-ink mb-2">
                    {i + 1}. {q.question}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => handleSelect(q.id, oi)}
                        aria-pressed={answers[q.id] === oi}
                        className={`text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                          answers[q.id] === oi
                            ? 'bg-teal text-white border-teal'
                            : 'bg-white border-rule text-ink/75 hover:border-teal-line'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {error && <p className="text-sm text-apricot">{error}</p>}

              <button onClick={handleQuizSubmit} className="btn-primary w-full">
                Submit quiz
              </button>
            </div>
          ) : (
            <div className="flex items-start gap-3 bg-teal-soft border border-teal-line rounded-xl px-4 py-3.5">
              <CircleCheck className="w-5 h-5 text-teal-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-ink">
                  {quizResult ? `${quizResult.label} — ${quizResult.score}/${quizResult.total} correct` : 'Quiz already completed'}
                </p>
                <p className="text-xs text-ink/55 mt-0.5">You can now check in below.</p>
              </div>
            </div>
          )}
        </section>

        {/* Attendance */}
        <section className="card p-5">
          <p className="label mb-3">Attendance</p>
          {!canCheckIn ? (
            <p className="flex items-center gap-2 text-sm text-ink/50 bg-cloud rounded-lg px-3.5 py-3 border border-dashed border-rule">
              <Lock className="w-4 h-4 shrink-0" />
              Complete today's quiz to unlock check-in.
            </p>
          ) : (
            <button
              aria-pressed={markedPresent}
              onClick={handlePresent}
              disabled={markedPresent}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border font-medium text-sm ${
                markedPresent ? 'bg-teal text-white border-teal' : 'bg-white border-rule text-ink/70 hover:border-teal-line'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" /> {markedPresent ? 'Checked in as Present' : 'Mark Present'}
            </button>
          )}
        </section>

        {/* Ask Teacher */}
        <section className="card p-5">
          <p className="label mb-3">Ask Teacher</p>
          <textarea
            className="field min-h-[80px] mb-3"
            placeholder="What's still unclear from today's class?"
            value={doubt}
            onChange={(e) => {
              setDoubt(e.target.value)
              if (doubtSent) setDoubtSent(false)
            }}
          />
          <button onClick={handleDoubtSubmit} disabled={!doubt.trim()} className="btn-primary flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Send to teacher
          </button>

          {doubtSent && (
            <p className="mt-3 text-sm text-teal-dark font-medium bg-teal-soft border border-teal-line rounded-xl px-4 py-3">
              Sent to your teacher — you'll get a reply on your next check-in.
            </p>
          )}
        </section>
      </main>
    </div>
  )
}
