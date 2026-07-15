import React from 'react'

export default function Loader({ label = 'Loading…', size = 'md', className = '' }) {
  const dimension = size === 'sm' ? 'h-4 w-4 border-2' : size === 'lg' ? 'h-10 w-10 border-[3px]' : 'h-6 w-6 border-2'

  return (
    <div className={`flex items-center gap-3 ${className}`} role="status" aria-live="polite">
      <span
        className={`${dimension} inline-block animate-spin rounded-full border-slate-250 border-t-basil-500`}
      />
      {label && <span className="text-sm font-medium text-slate-550">{label}</span>}
    </div>
  )
}

export function FullScreenLoader({ label = 'Verifying scan…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <span className="inline-block h-12 w-12 animate-spin rounded-full border-[3px] border-slate-250 border-t-harvest-500" />
      <p className="font-display text-base font-medium text-ink-soft">{label}</p>
    </div>
  )
}
