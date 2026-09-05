import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, KeyRound, School } from 'lucide-react'
import { BridgeMark } from '../components/BridgeMark'
import { useApp } from '../context/AppContext'
import { CLASSES, CLASS_LIST } from '../data/mockData'
import type { ClassId } from '../types'

export function Login() {
  const [role, setRole] = useState<'teacher' | 'student'>('student')
  const [classId, setClassId] = useState<ClassId>('S3')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const ok = login(role, role === 'teacher' ? classId : undefined, name, password)
    if (!ok) {
      setError('That password doesn\u2019t match college records. Check with your admin and try again.')
      return
    }
    navigate(role === 'teacher' ? '/' : '/student')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cloud px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-7">
          <BridgeMark className="w-9 h-9 mb-2" />
          <h1 className="font-display text-2xl">TeachBridge</h1>
        </div>

        <div className="card p-6">
          <div className="grid grid-cols-2 gap-1 bg-teal-soft rounded-xl p-1 mb-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                role === 'student' ? 'bg-white text-teal-dark shadow-sm' : 'text-teal-dark/60'
              }`}
              aria-pressed={role === 'student'}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                role === 'teacher' ? 'bg-white text-teal-dark shadow-sm' : 'text-teal-dark/60'
              }`}
              aria-pressed={role === 'teacher'}
            >
              Teacher
            </button>
          </div>

          {/* Class/section selection is a teacher-only step — a student's
              password determines their class automatically on submit. */}
          {role === 'teacher' && (
            <div className="mb-4">
              <label className="text-xs font-medium text-ink/60 mb-1 block">Class / section</label>
              <div className="grid grid-cols-2 gap-2">
                {CLASS_LIST.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setClassId(id)}
                    className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 text-left transition-colors ${
                      classId === id ? 'border-teal bg-teal-soft/60' : 'border-rule hover:border-teal-line'
                    }`}
                    aria-pressed={classId === id}
                  >
                    <School className="w-4 h-4 text-teal-dark shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-ink truncate">{CLASSES[id].label.replace('B.Tech CSE · ', '')}</span>
                      <span className="block text-xs text-ink/45 truncate">{CLASSES[id].subject}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="name" className="text-xs font-medium text-ink/60 mb-1 block">
                {role === 'teacher' ? 'Faculty name' : 'Your name'}
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-ink/35 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="name"
                  className="field pl-9"
                  placeholder={role === 'teacher' ? 'e.g. Prof. Nandini' : 'e.g. Aisha Menon'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-medium text-ink/60 mb-1 block">
                College password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-ink/35 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  className="field pl-9"
                  placeholder="Provided by your college"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-apricot bg-apricot-soft border border-apricot-line rounded-lg px-3 py-2">{error}</p>}

            <button type="submit" className="btn-primary w-full mt-1">
              Continue as {role === 'teacher' ? 'Teacher' : 'Student'}
            </button>

            {role === 'teacher' ? (
              <p className="text-xs text-ink/35 text-center pt-1">Demo password — cet@2026 (works for both sections)</p>
            ) : (
              <p className="text-xs text-ink/35 text-center pt-1">
                Demo passwords — Semester 3: bcse2026 · Machine Learning: ml2026
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
