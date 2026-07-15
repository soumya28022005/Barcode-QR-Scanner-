import React, { useCallback, useRef, useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'

/**
 * Camera QR scanner.
 * - Calls onDetected(value) exactly once per successful scan.
 * - Stops actively decoding immediately after a hit (via the `paused` prop)
 *   until the parent tells it to reset (via the `active` prop).
 * - Surfaces camera permission / device errors in place, with a retry action.
 */
export default function QRScanner({ active, onDetected }) {
  const [error, setError] = useState(null)
  const hasFiredRef = useRef(false)

  // Reset the guard whenever the scanner becomes active again
  React.useEffect(() => {
    if (active) hasFiredRef.current = false
  }, [active])

  const handleScan = useCallback(
    (detectedCodes) => {
      if (!active || hasFiredRef.current) return
      const value = detectedCodes?.[0]?.rawValue
      if (!value) return
      hasFiredRef.current = true
      onDetected(value)
    },
    [active, onDetected]
  )

  const handleError = useCallback((err) => {
    const name = err?.name || ''
    if (name === 'NotAllowedError') {
      setError('Camera access was denied. Allow camera permission in your browser settings and reload.')
    } else if (name === 'NotFoundError' || name === 'OverconstrainedError') {
      setError('No usable camera was found on this device.')
    } else {
      setError('Could not start the camera. Please try again.')
    }
  }, [])

  if (error) {
    return (
      <div className="flex aspect-square w-full max-w-sm flex-col items-center justify-center gap-4 rounded-xl2 border border-dashed border-chili-300 bg-chili-50 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chili-100 text-chili-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M20 8V6a2 2 0 0 0-2-2h-2M20 16v2a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-sm font-medium text-chili-700">{error}</p>
        <button
          onClick={() => setError(null)}
          className="rounded-full bg-chili-500 px-5 py-2 text-sm font-semibold text-canvas transition hover:bg-chili-600"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl2 bg-ink shadow-lifted">
      <div className="aspect-square w-full">
        <Scanner
          onScan={handleScan}
          onError={handleError}
          paused={!active}
          constraints={{ facingMode: 'environment' }}
          allowMultiple={false}
          scanDelay={400}
          styles={{
            container: { width: '100%', height: '100%' },
            video: { objectFit: 'cover' },
          }}
        />
      </div>

      {/* Viewfinder overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[62%] w-[62%]">
          <Corner className="left-0 top-0" />
          <Corner className="right-0 top-0 rotate-90" />
          <Corner className="bottom-0 right-0 rotate-180" />
          <Corner className="bottom-0 left-0 -rotate-90" />
          {active && (
            <div className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-full">
              <div className="h-6 w-full animate-scan-line bg-gradient-to-b from-transparent via-harvest-400 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Corner({ className }) {
  return (
    <svg
      className={`absolute h-6 w-6 text-harvest-400 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M2 9V4a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
