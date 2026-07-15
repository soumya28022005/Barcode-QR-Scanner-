import React, { useCallback, useEffect, useState } from 'react'
import SummaryCard from '../components/SummaryCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Loader from '../components/Loader.jsx'
import { fetchDashboard } from '../services/api.js'
import { foodLabel, formatDateTime } from '../utils/format.js'
import { useToast } from '../hooks/useToast.jsx'

const emptySummary = {
  totalServed: 0,
  vegCount: 0,
  nonVegCount: 0,
  pureVegCount: 0,
}

export default function TotalViewPage() {
  const [summary, setSummary] = useState(emptySummary)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const toast = useToast()

  const loadDashboard = useCallback(async (search = '', isPolling = false) => {
    // Only show hard loading state on initial load or manual search, not during background polling
    if (!isPolling) setLoading(true)
    setError(null)
    
    try {
      const data = await fetchDashboard({ search })
      
      // Handle records list (adapting to standard pagination wrappers like items/results)
      const list = Array.isArray(data) ? data : data?.items || data?.results || data?.records || []
      setRecords(list)

      // Handle summary counts 
      setSummary({
        totalServed: data?.totalServed || 0,
        vegCount: data?.counts?.veg || data?.vegCount || 0,
        nonVegCount: data?.counts?.non_veg || data?.counts?.nonVeg || data?.nonVegCount || 0,
        pureVegCount: data?.counts?.pure_veg || data?.counts?.pureVeg || data?.pureVegCount || 0,
      })
    } catch (err) {
      if (!isPolling) {
        setError(err.message || 'Could not load records.')
        toast.error('Could not load dashboard data.')
      }
    } finally {
      if (!isPolling) setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Initial load + Polling every 10 seconds (as requested in backend plan §5.5)
  useEffect(() => {
    loadDashboard(searchTerm)
    
    const intervalId = setInterval(() => {
      loadDashboard(searchTerm, true)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [loadDashboard, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
    loadDashboard(term)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-550">Live distribution summary for organizers.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        <SummaryCard label="Total Served" value={summary.totalServed} accent="basil" loading={loading && !records.length} />
        <SummaryCard label="Veg" value={summary.vegCount} accent="outline" loading={loading && !records.length} />
        <SummaryCard label="Non Veg" value={summary.nonVegCount} accent="outline" loading={loading && !records.length} />
        <SummaryCard label="Pure Veg" value={summary.pureVegCount} accent="harvest" loading={loading && !records.length} />
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-semibold text-ink">Records</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mt-4 overflow-hidden rounded-xl2 border border-slate-150 bg-canvas-raised shadow-soft">
        {loading && records.length === 0 ? (
          <div className="flex justify-center py-14">
            <Loader label="Loading records&hellip;" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chili-50 text-chili-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 16.5v.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-sm font-medium text-chili-600">{error}</p>
            <button
              onClick={() => loadDashboard(searchTerm)}
              className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-canvas transition hover:bg-ink-soft"
            >
              Retry
            </button>
          </div>
        ) : records.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-14 text-center">
            <span className="text-3xl">📭</span>
            <p className="font-display text-base font-semibold text-ink">
              {searchTerm ? 'No matching records' : 'No records yet'}
            </p>
            <p className="text-sm text-slate-550">
              {searchTerm ? 'Try a different email address.' : 'Collected entries will appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-150 text-xs font-semibold uppercase tracking-wide text-slate-550">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Food Type</th>
                  <th className="px-5 py-3">Served At</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Served By</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, idx) => (
                  <tr key={r.id || r.email || idx} className="border-b border-slate-150 last:border-0 hover:bg-canvas/60">
                    <td className="px-5 py-3 font-medium text-ink">{r.name || '&mdash;'}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-550">{r.email}</td>
                    <td className="px-5 py-3">{foodLabel(r.foodType || r.food_type)}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-550">{formatDateTime(r.servedAt || r.served_at)}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-basil-50 px-3 py-1 text-xs font-semibold text-basil-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-basil-500" />
                        {r.status === 'served' ? 'Served' : 'Collected'}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-550">{r.servedBy || r.served_by || '&mdash;'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}