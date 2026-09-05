import { useState } from 'react'
import { MessageSquareWarning, CheckCircle2, Send } from 'lucide-react'
import type { Doubt } from '../types'

interface DoubtCardProps {
  doubt: Doubt
  onReply?: (id: string, reply: string) => void
}

export function DoubtCard({ doubt, onReply }: DoubtCardProps) {
  const pending = doubt.status === 'pending'
  const [replyDraft, setReplyDraft] = useState('')
  const [replying, setReplying] = useState(false)

  const handleSend = () => {
    if (!replyDraft.trim() || !onReply) return
    onReply(doubt.id, replyDraft.trim())
    setReplyDraft('')
    setReplying(false)
  }

  return (
    <div className={`rounded-xl border p-4 ${pending ? 'bg-apricot-soft border-apricot-line' : 'bg-white border-rule'}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-teal-dark text-white text-xs font-semibold flex items-center justify-center shrink-0">
            {doubt.initials}
          </span>
          <div>
            <p className="text-sm font-medium text-ink">{doubt.studentName}</p>
            <p className="text-xs text-ink/45">{doubt.time}</p>
          </div>
        </div>
        <span
          className={`shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
            pending ? 'bg-apricot text-white' : 'bg-teal-soft text-teal-dark'
          }`}
        >
          {pending ? <MessageSquareWarning className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
          {pending ? 'Awaiting reply' : 'Answered'}
        </span>
      </div>
      <p className="text-sm text-ink/85 mb-2">{doubt.question}</p>

      {doubt.teacherReply && (
        <p className="text-sm text-ink/60 border-l-2 border-teal-line pl-3 mt-2">{doubt.teacherReply}</p>
      )}

      {pending && onReply && (
        <div className="mt-3">
          {!replying ? (
            <button
              onClick={() => setReplying(true)}
              className="text-xs font-medium text-teal-dark hover:underline flex items-center gap-1"
            >
              <Send className="w-3 h-3" /> Reply to student
            </button>
          ) : (
            <div className="flex gap-2 mt-1">
              <input
                autoFocus
                className="field flex-1 text-sm"
                placeholder="Type a short reply..."
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="btn-primary px-3" disabled={!replyDraft.trim()}>
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
