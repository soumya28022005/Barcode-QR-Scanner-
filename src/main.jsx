import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// ToastProvider ইমপোর্ট করুন (যদি আপনার প্রজেক্টে থাকে, এরর লগে ToastProvider দেখা যাচ্ছে)
import { ToastProvider } from './hooks/useToast.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
)