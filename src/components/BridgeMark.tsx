export function BridgeMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4 21C4 21 8 13 16 13C24 13 28 21 28 21"
        stroke="#0F6E64"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="4" cy="23" r="2" fill="#0F6E64" />
      <circle cx="28" cy="23" r="2" fill="#0F6E64" />
      <circle cx="16" cy="13" r="2.2" fill="#D97D48" />
    </svg>
  )
}
