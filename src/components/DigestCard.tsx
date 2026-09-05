import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface DigestCardProps {
  icon: LucideIcon
  title: string
  children: ReactNode
}

export function DigestCard({ icon: Icon, title, children }: DigestCardProps) {
  return (
    <div className="card p-5 flex-1 min-w-[220px]">
      <div className="flex items-center gap-2 mb-2.5 text-teal-dark">
        <Icon className="w-4 h-4" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="text-sm text-ink/75 leading-relaxed">{children}</div>
    </div>
  )
}
