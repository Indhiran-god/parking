import React from 'react';

const VehicleEntry = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Entry Panel</h1>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <p className="text-blue-800">
          This panel allows administrators to register incoming vehicles and assign parking slots.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Entry Form</h2>
          <p className="text-gray-600 mb-4">Form for registering new vehicle entries will be implemented here.</p>
          <div className="space-y-4">
            <div className="border border-gray-300 rounded p-3 bg-gray-50">
              Vehicle Registration Input
            </div>
            <div className="border border-gray-300 rounded p-3 bg-gray-50">
              Owner Details Input
            </div>
            <div className="border border-gray-300 rounded p-3 bg-gray-50">
              Vehicle Type Selection
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded">
              Register Vehicle Entry
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Slots</h2>
          <p className="text-gray-600 mb-4">List of available parking slots for assignment.</p>
          <div className="space-y-2">
            {['A-001', 'A-002', 'A-005', 'A-010', 'B-003'].map((slot) => (
              <div key={slot} className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded">
                <span className="font-medium">{slot}</span>
                <span className="text-green-600 text-sm">Available</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleEntry;
