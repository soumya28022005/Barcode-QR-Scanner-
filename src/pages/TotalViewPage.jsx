import React, { useState, useEffect } from 'react';
import { fetchDashboard } from '../services/api';

const TotalViewPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API থেকে ডেটা আনার ফাংশন
    const loadData = async () => {
      try {
        const response = await fetchDashboard();
        setDashboardData(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setError("Failed to load dashboard data. Backend might be offline.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // ডেটা লোড হওয়ার সময় স্ক্রিনে যা দেখাবে
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* যদি ব্যাকএন্ড বন্ধ থাকার কারণে এরর আসে, তাহলে এই মেসেজটি দেখাবে */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
        </div>
      )}

      {/* ড্যাশবোর্ডের কার্ডগুলো */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Served */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <h2 className="text-gray-500 font-semibold text-sm uppercase">Total Served</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {dashboardData?.totalServed || 0}
          </p>
        </div>

        {/* Veg */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
          <h2 className="text-gray-500 font-semibold text-sm uppercase">Veg</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {dashboardData?.counts?.veg || 0}
          </p>
        </div>

        {/* Non-Veg */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-red-500">
          <h2 className="text-gray-500 font-semibold text-sm uppercase">Non-Veg</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {dashboardData?.counts?.non_veg || 0}
          </p>
        </div>

        {/* Pure Veg */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-yellow-500">
          <h2 className="text-gray-500 font-semibold text-sm uppercase">Pure Veg</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {dashboardData?.counts?.pure_veg || 0}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default TotalViewPage;