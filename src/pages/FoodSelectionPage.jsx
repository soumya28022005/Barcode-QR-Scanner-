import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FoodCard from '../components/FoodCard.jsx'
import { FOOD_TYPES, initialsFromName } from '../utils/format.js'
import { submitFoodSelection } from '../services/api.js'
import { useToast } from '../hooks/useToast.jsx'

export default function FoodSelectionPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const { name, token } = location.state || {}

  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Guard against someone landing here directly (e.g. page refresh) without a
  // verified recipient in navigation state.
  if (!email) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-5 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">No recipient in progress</h1>
        <p className="text-sm text-slate-550">Scan a QR ticket first to select a food option.</p>
        <button
          onClick={() => navigate('/')}
          className="rounded-full bg-basil-500 px-6 py-3 text-sm font-semibold text-canvas transition hover:bg-basil-600"
        >
          Go to scanner
        </button>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (!selected || submitting) return
    setSubmitting(true)
    try {
      await submitFoodSelection({ 
  token: token, 
  food_type: selected 
})
      toast.success('✅ Food selection submitted successfully.')
      navigate('/', { state: { justSubmitted: true } })
    } catch (err) {
      toast.error(err.message || 'Could not submit the food selection.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
      <span className="mb-3 inline-block rounded-full bg-harvest-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-harvest-600">
        Step 2 of 2
      </span>
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Choose a food option</h1>
      <p className="mt-2 text-sm text-slate-550">Confirm the recipient below, then select one option.</p>

      {/* Identity card — ticket-stub motif */}
      <div className="ticket-notch mt-8 flex items-center gap-4 rounded-xl2 bg-canvas-raised p-5 shadow-soft">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-basil-500 font-display text-lg font-semibold text-canvas">
          {initialsFromName(name) || '?'}
        </div>
        <div className="ticket-perf min-w-0 flex-1 pl-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-550">Name</p>
          <p className="truncate font-display text-lg font-semibold text-ink">{name || '—'}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-550">Email</p>
          <p className="truncate text-sm font-medium text-ink-soft">{email}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FOOD_TYPES.map((food) => (
          <FoodCard
            key={food.value}
            name="foodType"
            value={food.value}
            emoji={food.emoji}
            label={food.label}
            accent={food.accent}
            checked={selected === food.value}
            onChange={setSelected}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected || submitting}
        className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-base font-semibold text-canvas shadow-soft transition hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-canvas/40 border-t-canvas" />
            Submitting…
          </>
        ) : (
          'Submit'
        )}
      </button>
    </div>
  )
}
