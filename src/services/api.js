import axios from 'axios';

// Vite environment variable থেকে বেস ইউআরএল নেওয়া হচ্ছে
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api',
});

// রিকোয়েস্ট ইন্টারসেপ্টর: প্রতিটি API কলে স্বয়ংক্রিয়ভাবে টোকেন পাঠানো
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- API Endpoints ---

// ১. অথেনটিকেশন
export const loginStaff = (credentials) => API.post('/auth/login', credentials);

// ২. কিউআর স্ক্যান এবং লুকআপ 
export const verifyQrCode = (token) => API.get(`/students/by-token/${token}`);

// ৩. ম্যানুয়াল সার্চ (reissue desk এর জন্য)
export const searchStudent = (query) => API.get(`/students/search?query=${query}`);

// ৪. খাবার সাবমিট (Atomic Update)
export const submitFoodClaim = (submitData) => API.post('/submit', submitData);

// ৫. টোকেন রি-ইস্যু (অ্যাডমিন অনলি)
export const reissueQRToken = (reissueData) => API.post('/reissue', reissueData);

// ৬. ম্যানুয়ালি নতুন স্টুডেন্ট অ্যাড (অ্যাডমিন অনলি)
export const manualAddStudent = (studentData) => API.post('/students/manual-add', studentData);

// ৭. ড্যাশবোর্ড ডেটা ফেচ
export const fetchDashboard = () => API.get('/dashboard');

export default API;