import React from 'react'

const ACCENT_MAP = {
  chili: { border: 'border-chili-500', bg: 'bg-chili-50', dot: 'border-chili-500 bg-chili-500' },
  basil: { border: 'border-basil-500', bg: 'bg-basil-50', dot: 'border-basil-500 bg-basil-500' },
  harvest: { border: 'border-harvest-500', bg: 'bg-harvest-50', dot: 'border-harvest-500 bg-harvest-500' },
}

export default function FoodCard({ name, value, emoji, label, checked, onChange, accent = 'basil' }) {
  const tone = ACCENT_MAP[accent] || ACCENT_MAP.basil

  return (
    <label className="group relative block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        className={`flex flex-col items-center gap-3 rounded-xl2 border-2 bg-canvas-raised px-4 py-6 text-center shadow-soft transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lifted ${
          checked ? `${tone.border} ${tone.bg}` : 'border-slate-150'
        }`}
      >
        <span className="text-4xl">{emoji}</span>
        <span className="font-display text-base font-semibold text-ink">{label}</span>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
            checked ? tone.dot : 'border-slate-250'
          }`}
        >
          {checked && (
            <svg className="h-2.5 w-2.5 text-canvas" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </div>
    </label>
  )
}
