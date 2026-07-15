import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import QRScannerPage from './pages/QRScannerPage.jsx'
import FoodSelectionPage from './pages/FoodSelectionPage.jsx'
import TotalViewPage from './pages/TotalViewPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<QRScannerPage />} />
          <Route path="/food-selection" element={<FoodSelectionPage />} />
          <Route path="/total-view" element={<TotalViewPage />} />
          <Route path="*" element={<QRScannerPage />} />
        </Routes>
      </main>
    </div>
  )
}
