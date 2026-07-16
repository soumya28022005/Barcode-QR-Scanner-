import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  // লোকাল স্টোরেজ থেকে টোকেন এবং রোল নেওয়া হচ্ছে
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // যদি লগইন করা না থাকে (টোকেন না থাকে), তাহলে Navbar দেখাবে না
  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // ডাইনামিক লিংকস: যদি অ্যাডমিন হয়, তবেই 'Dashboard' অপশনটি লিস্টে অ্যাড হবে
  const links = [
    { to: '/', label: 'Scan', icon: ScanIcon },
    ...(role === 'admin' ? [{ to: '/total-view', label: 'Dashboard', icon: GridIcon }] : []),
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-150 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-basil-500 text-canvas shadow-soft">
            <LeafIcon />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold text-ink">Farewell Event</p>
            <p className="hidden text-xs text-slate-550 sm:block">Food Distribution</p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-150 bg-canvas-raised p-1 shadow-soft sm:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-basil-500 text-canvas shadow-soft'
                    : 'text-ink-soft hover:bg-slate-150/70'
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
          {/* ডেস্কটপ লগআউট বাটন */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogoutIcon />
            Logout
          </button>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-150 bg-canvas-raised sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-150 bg-canvas-raised px-5 py-3 sm:hidden">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-basil-500 text-canvas' : 'text-ink-soft hover:bg-slate-150/70'
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
          {/* মোবাইল লগআউট বাটন */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
          >
            <LogoutIcon />
            Logout
          </button>
        </nav>
      )}
    </header>
  )
}

// --- আপনার আগের সব SVG আইকন নিচে দেওয়া হলো ---

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4C10 4 4 10 4 18v2h2c8 0 14-6 14-14V4h-0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 18C10 14 14 10 18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ScanIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M20 8V6a2 2 0 0 0-2-2h-2M20 16v2a2 2 0 0 1-2 2h-2M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  )
}

// লগআউটের জন্য নতুন আইকন
function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}