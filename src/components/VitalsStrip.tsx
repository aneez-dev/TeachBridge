import { Users, MessageCircleQuestion, ClipboardCheck } from 'lucide-react'

interface VitalsStripProps {
  attendancePct: number
  pendingDoubts: number
  quizCompletionPct: number
}

export function VitalsStrip({ attendancePct, pendingDoubts, quizCompletionPct }: VitalsStripProps) {
  const stats = [
    { label: 'Attendance', value: `${attendancePct}%`, icon: Users },
    { label: 'Pending doubts', value: pendingDoubts, icon: MessageCircleQuestion },
    { label: 'Quiz completion', value: `${quizCompletionPct}%`, icon: ClipboardCheck },
  ]

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-ink/80">Class Vitals</h2>
        <div className="flex items-center gap-2 text-xs text-ink/45">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal/60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
          </span>
          Updated just now
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl bg-teal-soft border border-teal-line px-4 py-3.5">
            <div className="flex items-center gap-2 text-teal-dark mb-1.5">
              <Icon className="w-4 h-4" />
              <span className="text-xs font-medium">{label}</span>
            </div>
            <p className="font-display text-2xl text-ink">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-teal-line via-teal to-teal-line opacity-60" />
    </div>
  )
}
