import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginStaff } from '../services/api';
// আপনার Toast হুক ইমপোর্ট করা হলো
import { useToast } from '../hooks/useToast'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast(); // Toast দেখানোর জন্য

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API কল
      const response = await loginStaff({ username, pin });
      
      // লোকাল স্টোরেজে ডেটা সেভ করা
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); 
      
      addToast('Login successful!', 'success');
      navigate('/'); // হোম পেজ বা স্ক্যানার পেজে রিডাইরেক্ট
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Invalid username or PIN';
      addToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 rounded-xl">
        <h3 className="text-2xl font-bold text-center text-gray-800">Staff Login</h3>
        <p className="text-sm text-center text-gray-500 mb-6">Farewell Food Distribution</p>
        
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-800" htmlFor="pin">PIN</label>
              <input
                type="password"
                id="pin"
                placeholder="Enter PIN"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-300"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;