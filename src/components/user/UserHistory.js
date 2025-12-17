import React from 'react';

const UserHistory = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Parking History</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-blue-800">
              View your past parking usage, including entry/exit times, slot numbers, and fees paid.
            </p>
          </div>
          
          <div className="text-center py-12 text-gray-500">
            Parking history functionality will be implemented here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
