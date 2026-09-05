import { useNavigate } from 'react-router-dom'
import { LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { BridgeMark } from './BridgeMark'
import { useApp } from '../context/AppContext'
import { CLASSES, CLASS_LIST } from '../data/mockData'
import type { ClassId } from '../types'

export function Header() {
  const { auth, logout, switchClass, currentClass } = useApp()
  const navigate = useNavigate()
  const [switcherOpen, setSwitcherOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSwitch = (classId: ClassId) => {
    switchClass(classId)
    setSwitcherOpen(false)
  }

  return (
    <header className="border-b border-rule bg-paper/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BridgeMark />
          <div>
            <p className="font-display text-lg leading-none">TeachBridge</p>
            <p className="text-xs text-ink/55 mt-0.5">
              {currentClass ? `${currentClass.label} · ${currentClass.subject}` : ''}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-white border border-rule rounded-full p-1">
          <span className="px-3.5 py-1.5 rounded-full text-sm font-medium bg-teal text-white">
            {auth.role === 'teacher' ? 'Teacher view' : 'Student check-in'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {auth.role === 'teacher' && (
            <div className="relative">
              <button
                onClick={() => setSwitcherOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm text-ink/60 hover:text-teal-dark px-2.5 py-1.5 rounded-lg border border-rule"
              >
                Switch class
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {switcherOpen && (
                <div className="absolute right-0 mt-1.5 w-56 bg-white border border-rule rounded-xl shadow-lg overflow-hidden z-20">
                  {CLASS_LIST.map((id) => (
                    <button
                      key={id}
                      onClick={() => handleSwitch(id)}
                      className={`w-full text-left px-3.5 py-2.5 text-sm hover:bg-teal-soft/60 ${
                        auth.classId === id ? 'bg-teal-soft text-teal-dark font-medium' : 'text-ink/75'
                      }`}
                    >
                      <span className="block">{CLASSES[id].label}</span>
                      <span className="block text-xs text-ink/45">{CLASSES[id].subject}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <span className="hidden md:inline text-sm text-ink/60">{auth.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-ink/60 hover:text-teal-dark px-2 py-1.5 rounded-lg"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
