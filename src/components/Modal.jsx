import React, { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, tone = 'basil', icon, title, description, actionLabel = 'Scan next', onAction }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (open) closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const toneRing = tone === 'chili' ? 'bg-chili-50 text-chili-600' : 'bg-basil-50 text-basil-600'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-sm animate-pop-in rounded-xl2 bg-canvas-raised p-7 text-center shadow-lifted">
        <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${toneRing}`}>
          {icon}
        </div>
        <h2 id="modal-title" className="font-display text-xl font-semibold text-ink">
          {title}
        </h2>
        {description && <p className="mt-2 text-sm leading-relaxed text-slate-550">{description}</p>}
        <button
          ref={closeRef}
          onClick={onAction || onClose}
          className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-canvas transition hover:bg-ink-soft focus-visible:outline-offset-4"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

export function CheckCircleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AlertIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M12 9v4M12 16.5v.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M10.6 3.9 2.8 17.4c-.6 1 .1 2.3 1.3 2.3h15.8c1.2 0 1.9-1.3 1.3-2.3L13.4 3.9c-.6-1-2.1-1-2.8 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
