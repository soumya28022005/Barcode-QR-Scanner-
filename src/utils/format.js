export const FOOD_TYPES = [
  { value: 'non_veg', label: 'Non Veg', emoji: '🍗', accent: 'chili' },
  { value: 'veg', label: 'Veg', emoji: '🥦', accent: 'basil' },
  { value: 'pure_veg', label: 'Pure Veg', emoji: '🥗', accent: 'harvest' },
]

export const foodLabel = (value) => {
  const match = FOOD_TYPES.find((f) => f.value === value)
  return match ? `${match.emoji} ${match.label}` : value || '—'
}

export const formatDateTime = (value) => {
  if (!value) return '—'
  try {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return value
  }
}

export const initialsFromName = (name = '') => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}