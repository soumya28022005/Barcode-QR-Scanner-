import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QRScannerPage from './pages/QRScannerPage';
import TotalViewPage from './pages/TotalViewPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Navbar ইমপোর্ট করা হলো

function App() {
  return (
    <Router>
      {/* Navbar সব পেজের ওপরে থাকবে (যদি ইউজার লগইন করা থাকে) */}
      <Navbar /> 
      
      <Routes>
        {/* পাবলিক রুট - লগইন পেজ */}
        <Route path="/login" element={<LoginPage />} />

        {/* প্রটেক্টেড রুট - স্ক্যানার (অ্যাডমিন এবং ভলান্টিয়ার উভয়ের জন্য) */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <QRScannerPage />
            </ProtectedRoute>
          } 
        />

        {/* প্রটেক্টেড রুট - ড্যাশবোর্ড (শুধুমাত্র অ্যাডমিনদের জন্য) */}
        <Route 
          path="/total-view" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <TotalViewPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;