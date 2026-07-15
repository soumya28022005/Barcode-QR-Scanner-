import React, { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QRScanner from '../components/QRScanner.jsx'
import Modal, { CheckCircleIcon, AlertIcon } from '../components/Modal.jsx'
import { FullScreenLoader } from '../components/Loader.jsx'
import { verifyQrCode } from '../services/api.js'
import { useToast } from '../hooks/useToast.jsx'

export default function QRScannerPage() {
  const [scannerActive, setScannerActive] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [modal, setModal] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  const justSubmitted = location.state?.justSubmitted

  const resetScanner = useCallback(() => {
    setModal(null)
    setScannerActive(true)
  }, [])

  const handleDetected = useCallback(
    async (qrData) => {
      setScannerActive(false)
      setVerifying(true)
      try {
        const result = await verifyQrCode(qrData)
        setVerifying(false)

        if (result?.name) {
          navigate('/food-selection', {
            state: { name: result.name, token: qrData }, // Send Token instead of Email
          })
          return
        }

        setModal({
          tone: 'chili',
          title: 'Unrecognized response',
          description: 'The QR code was verified, but the response was not in the expected format.',
        })
      } catch (err) {
        setVerifying(false)
        
        // Handle atomic 409 already-served backend error gracefully
        if (err.response?.status === 409) {
           setModal({
             tone: 'chili',
             title: 'Food already collected',
             description: err.response?.data?.message || 'This ticket has already been used.',
           })
        } else {
           toast.error(err.message || 'Could not verify this QR code.')
           setScannerActive(true)
        }
      }
    },
    [navigate, toast]
  )

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-10 text-center sm:py-14">
      <span className="mb-3 rounded-full bg-basil-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-basil-600">
        Step 1 of 2
      </span>
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Scan to collect</h1>
      <p className="mt-2 max-w-xs text-sm text-slate-550">
        Point the camera at the recipient&rsquo;s QR ticket to verify eligibility.
      </p>

      {justSubmitted && (
        <p className="mt-4 rounded-full bg-basil-50 px-4 py-2 text-sm font-medium text-basil-600">
          Food selection submitted successfully. Ready for the next scan.
        </p>
      )}

      <div className="mt-8 w-full">
        {verifying ? (
          <FullScreenLoader label="Verifying scan&hellip;" />
        ) : (
          <QRScanner active={scannerActive} onDetected={handleDetected} />
        )}
      </div>

      {!verifying && (
        <p className="mt-6 text-xs text-slate-450">
          {scannerActive ? 'Scanning automatically—hold the QR code steady.' : 'Scanner paused.'}
        </p>
      )}

      <Modal
        open={!!modal}
        tone={modal?.tone}
        icon={modal?.tone === 'chili' ? <AlertIcon /> : <CheckCircleIcon />}
        title={modal?.title}
        description={modal?.description}
        actionLabel="Scan next"
        onClose={resetScanner}
        onAction={resetScanner}
      />
    </div>
  )
}