import React from 'react'

const ACCENTS = {
  ink: 'bg-ink text-canvas',
  basil: 'bg-basil-500 text-canvas',
  harvest: 'bg-harvest-500 text-ink',
  chili: 'bg-chili-500 text-canvas',
  outline: 'bg-canvas-raised text-ink border border-slate-150',
}

export default function SummaryCard({ label, value, icon, accent = 'outline', loading = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl2 p-5 shadow-soft transition-transform duration-200 hover:-translate-y-0.5 ${ACCENTS[accent]}`}
    >
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide ${accent === 'outline' ? 'text-slate-550' : 'opacity-80'}`}>
          {label}
        </p>
        {loading ? (
          <div className="mt-2 h-8 w-14 animate-pulse rounded-md bg-current/20" />
        ) : (
          <p className="mt-1 font-mono text-3xl font-semibold">{value}</p>
        )}
      </div>
      {icon && <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-black/10">{icon}</div>}
    </div>
  )
}
