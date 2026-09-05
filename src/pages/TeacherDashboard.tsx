import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  UploadCloud,
  Sparkles,
  Youtube,
  Check,
  FileText,
  Brain,
  Smile,
  MessageSquareWarning,
  X,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Header } from '../components/Header'
import { VitalsStrip } from '../components/VitalsStrip'
import { DigestCard } from '../components/DigestCard'
import { DoubtCard } from '../components/DoubtCard'
import { useApp } from '../context/AppContext'
import type { QuizQuestion } from '../types'

const emptyDraft = { question: '', options: ['', '', '', ''], correctIndex: 0 }

export function TeacherDashboard() {
  const {
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
    replyToDoubt,
    toggleRecoveryMode,
  } = useApp()

  const [topicInput, setTopicInput] = useState(currentClass?.classSetup.topic ?? '')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<QuizQuestion, 'id'>>(emptyDraft)
  const [showQuestionForm, setShowQuestionForm] = useState(false)

  if (!currentClass) return null
  const { classSetup, doubts, attempts, attendance, recoveryMode } = currentClass

  const attendancePct = Math.round((attendance.present / attendance.total) * 100)
  const pendingDoubts = doubts.filter((d) => d.status === 'pending').length
  const quizCompletionPct = Math.round((attempts.length / attendance.total) * 100)

  const topPriorityDoubt = doubts.find((d) => d.status === 'pending') ?? doubts[0]

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length) {
      Array.from(files).forEach((f) => addPdf(f.name))
    }
    e.target.value = ''
  }

  const commitTopic = () => {
    if (topicInput.trim()) setTopic(topicInput.trim())
  }

  const startAddQuestion = () => {
    setEditingId(null)
    setDraft(emptyDraft)
    setShowQuestionForm(true)
  }

  const startEditQuestion = (q: QuizQuestion) => {
    setEditingId(q.id)
    setDraft({ question: q.question, options: [...q.options], correctIndex: q.correctIndex })
    setShowQuestionForm(true)
  }

  const handleQuestionSubmit = (e: FormEvent) => {
    e.preventDefault()
    const cleanOptions = draft.options.map((o) => o.trim())
    if (!draft.question.trim() || cleanOptions.some((o) => !o)) return
    const payload = { question: draft.question.trim(), options: cleanOptions, correctIndex: draft.correctIndex }
    if (editingId) {
      updateQuizQuestion(editingId, payload)
    } else {
      addQuizQuestion(payload)
    }
    setShowQuestionForm(false)
    setEditingId(null)
    setDraft(emptyDraft)
  }

  const goodCount = attempts.filter((a) => a.result === 'Good understanding').length
  const strugglingTopics = attempts.filter((a) => a.result !== 'Good understanding').length

  return (
    <div className="min-h-screen bg-cloud pb-16">
      <Header />

      <main className="max-w-6xl mx-auto px-5 md:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <p className="label mb-1.5">Teacher dashboard · {currentClass.label}</p>
            <h1 className="font-display text-2xl md:text-[28px] mb-1.5">A small window into the room.</h1>
            <p className="text-sm text-ink/55 max-w-md">
              Everything below takes under two minutes to read through. Update today's material, then let the class run itself.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-rule rounded-xl px-4 py-3 shrink-0">
            <div className="text-right">
              <p className="text-sm font-medium text-ink">Recovery Mode</p>
              <p className="text-xs text-ink/45">Only the essentials, for today.</p>
            </div>
            <button
              role="switch"
              aria-checked={recoveryMode}
              aria-label="Toggle recovery mode"
              onClick={toggleRecoveryMode}
              className={`relative w-11 h-6 rounded-full shrink-0 ${recoveryMode ? 'bg-teal' : 'bg-rule'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  recoveryMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {recoveryMode ? (
            <>
              <VitalsStrip
                attendancePct={attendancePct}
                pendingDoubts={pendingDoubts}
                quizCompletionPct={quizCompletionPct}
              />
              <div className="card p-6 bg-apricot-soft border-apricot-line">
                <p className="label mb-2 text-apricot">Needs your voice</p>
                <h2 className="font-display text-xl mb-3">One thing worth your attention today</h2>
                {topPriorityDoubt && <DoubtCard doubt={topPriorityDoubt} onReply={replyToDoubt} />}
                <p className="text-xs text-ink/45 mt-4">
                  Everything else is quietly waiting. Turn off Recovery Mode whenever you're ready to see the rest.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Today's Class Setup */}
              <section className="card p-5">
                <p className="label mb-3">Today's class setup</p>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-ink/60 mb-1 block">Topic / lesson</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        className="field flex-1"
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        onBlur={commitTopic}
                      />
                      <button onClick={commitTopic} className="btn-secondary px-3">
                        Save
                      </button>
                    </div>
                    {classSetup.topicOptions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {classSetup.topicOptions.map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setTopicInput(t)
                              setTopic(t)
                            }}
                            className={`text-xs px-2.5 py-1.5 rounded-full border ${
                              classSetup.topic === t
                                ? 'bg-teal text-white border-teal'
                                : 'bg-white border-rule text-ink/60 hover:border-teal-line'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}

                    <label className="text-xs font-medium text-ink/60 mb-1 block">Learning material (PDFs)</label>
                    <label className="flex items-center gap-2.5 border border-dashed border-rule rounded-xl px-3.5 py-3 text-sm text-ink/60 cursor-pointer hover:border-teal">
                      <UploadCloud className="w-4 h-4 text-teal-dark shrink-0" />
                      <span className="truncate">Upload one or more PDFs</span>
                      <input type="file" accept=".pdf" multiple className="hidden" onChange={handleFileChange} />
                    </label>

                    {classSetup.pdfs.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {classSetup.pdfs.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-2 border border-rule rounded-lg px-3 py-2 text-sm bg-white"
                          >
                            <FileText className="w-4 h-4 text-teal-dark shrink-0" />
                            <span className="flex-1 truncate">{p.name}</span>
                            <span className="text-xs text-ink/40 shrink-0">{p.uploadedAt}</span>
                            <button
                              onClick={() => removePdf(p.id)}
                              className="text-ink/35 hover:text-apricot shrink-0"
                              aria-label={`Remove ${p.name}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-medium text-ink/60 mb-1.5">Video recommendations</p>
                      {!classSetup.resourcesGenerated ? (
                        <button onClick={generateResources} className="btn-secondary w-full flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Generate resources
                        </button>
                      ) : (
                        <div className="space-y-2">
                          {classSetup.resources.map((r) => (
                            <label
                              key={r.id}
                              className="flex items-start gap-2.5 border border-rule rounded-lg px-3 py-2 text-sm cursor-pointer hover:border-teal-line"
                            >
                              <input
                                type="checkbox"
                                checked={r.approved}
                                onChange={() => toggleResourceApproval(r.id)}
                                className="mt-1 accent-teal"
                              />
                              <div className="min-w-0">
                                <p className="flex items-center gap-1.5 font-medium text-ink truncate">
                                  <Youtube className="w-3.5 h-3.5 text-apricot shrink-0" />
                                  {r.title}
                                </p>
                                <p className="text-xs text-ink/45">{r.channel}</p>
                              </div>
                            </label>
                          ))}
                          <button
                            onClick={publishResources}
                            className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
                            disabled={!classSetup.resources.some((r) => r.approved)}
                          >
                            <Check className="w-4 h-4" />
                            {classSetup.resourcesPublished ? 'Published to class' : 'Approve & publish'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-rule my-5" />

                <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <p className="text-sm font-medium text-ink">Quiz for today's topic</p>
                    <p className="text-xs text-ink/45">
                      {classSetup.quiz.length} question{classSetup.quiz.length === 1 ? '' : 's'} · students see the quiz once you
                      assign it.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={startAddQuestion} className="btn-secondary flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add question
                    </button>
                    <button
                      onClick={publishQuiz}
                      disabled={classSetup.quiz.length === 0}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {classSetup.quizPublished ? 'Assigned to students' : 'Assign quiz'}
                    </button>
                  </div>
                </div>

                {showQuestionForm && (
                  <form onSubmit={handleQuestionSubmit} className="rounded-lg bg-teal-soft/60 border border-teal-line px-3.5 py-3.5 mb-3 space-y-2.5">
                    <input
                      className="field"
                      placeholder="Question text"
                      value={draft.question}
                      onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))}
                    />
                    <div className="grid sm:grid-cols-2 gap-2">
                      {draft.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="correctOption"
                            checked={draft.correctIndex === oi}
                            onChange={() => setDraft((d) => ({ ...d, correctIndex: oi }))}
                            className="accent-teal shrink-0"
                            aria-label={`Mark option ${oi + 1} correct`}
                          />
                          <input
                            className="field flex-1"
                            placeholder={`Option ${oi + 1}`}
                            value={opt}
                            onChange={(e) =>
                              setDraft((d) => {
                                const options = [...d.options]
                                options[oi] = e.target.value
                                return { ...d, options }
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-ink/45">Select the radio button next to the correct option.</p>
                    <div className="flex gap-2">
                      <button type="submit" className="btn-primary flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        {editingId ? 'Save changes' : 'Add to quiz'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowQuestionForm(false)
                          setEditingId(null)
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {classSetup.quiz.length > 0 && (
                  <div className="space-y-3">
                    {classSetup.quiz.map((q, i) => (
                      <div key={q.id} className="rounded-lg bg-teal-soft/60 border border-teal-line px-3.5 py-3">
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <p className="text-sm font-medium text-ink">
                            {i + 1}. {q.question}
                          </p>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => startEditQuestion(q)}
                              className="text-ink/40 hover:text-teal-dark p-1"
                              aria-label="Edit question"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteQuizQuestion(q.id)}
                              className="text-ink/40 hover:text-apricot p-1"
                              aria-label="Delete question"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-1.5">
                          {q.options.map((opt, oi) => (
                            <p
                              key={oi}
                              className={`text-xs px-2.5 py-1.5 rounded-md ${
                                oi === q.correctIndex
                                  ? 'bg-teal text-white font-medium'
                                  : 'bg-white text-ink/55 border border-rule'
                              }`}
                            >
                              {opt}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Daily Digest */}
              <section>
                <p className="label mb-3">Daily digest</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <DigestCard icon={FileText} title="Topic covered">
                    {classSetup.topic}. Students engaged via the approved video resources and a follow-up quiz.
                  </DigestCard>
                  <DigestCard icon={Brain} title="Quiz performance">
                    {goodCount} of {attempts.length} students showed good understanding.{' '}
                    {strugglingTopics > 0 && `${strugglingTopics} could use a quick recap.`}
                  </DigestCard>
                  <DigestCard icon={Smile} title="Class mood">
                    Active and curious — {doubts.length} questions came in, a healthy sign of engagement rather than confusion.
                  </DigestCard>
                </div>
              </section>

              <VitalsStrip
                attendancePct={attendancePct}
                pendingDoubts={pendingDoubts}
                quizCompletionPct={quizCompletionPct}
              />

              {/* Ask Teacher inbox */}
              <section className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="label">Ask Teacher · student doubts</p>
                  <span className="flex items-center gap-1.5 text-xs text-apricot font-medium">
                    <MessageSquareWarning className="w-3.5 h-3.5" />
                    {pendingDoubts} awaiting reply
                  </span>
                </div>
                <div className="space-y-3">
                  {doubts.length === 0 && <p className="text-sm text-ink/45">No doubts submitted yet.</p>}
                  {doubts.map((d) => (
                    <DoubtCard key={d.id} doubt={d} onReply={replyToDoubt} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
