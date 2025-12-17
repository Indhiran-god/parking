import React from 'react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h1>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <p className="text-green-800">
              Welcome to your parking dashboard. Here you can view your current parking status, history, and manage your profile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Parking Status</h2>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🅿️</div>
                <div className="text-xl font-bold text-gray-700 mb-2">Not Currently Parked</div>
                <p className="text-gray-600">Your vehicle is not parked in our facility.</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded text-left">
                  🚗 Submit Entry Request
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded text-left">
                  📋 View Parking History
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded text-left">
                  👤 Update Profile
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded text-left">
                  ℹ️ Get Help
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Parking Activity</h2>
            <div className="text-center py-8 text-gray-500">
              No recent parking activity found.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
