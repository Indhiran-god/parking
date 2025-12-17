import React from 'react';

const VehicleExit = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Exit Panel</h1>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <p className="text-green-800">
          This panel allows administrators to process vehicle departures, calculate parking fees, and free up slots.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Exit Form</h2>
          <p className="text-gray-600 mb-4">Search for vehicle by registration or slot number to process exit.</p>
          <div className="space-y-4">
            <div className="border border-gray-300 rounded p-3 bg-gray-50">
              Vehicle Registration / Slot Number Input
            </div>
            <div className="border border-gray-300 rounded p-3 bg-gray-50">
              Vehicle Details Display
            </div>
            <div className="border border-gray-300 rounded p-3 bg-gray-50">
              Parking Duration & Fee Calculation
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded">
              Process Vehicle Exit
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Currently Parked Vehicles</h2>
          <p className="text-gray-600 mb-4">List of vehicles currently parked for quick exit processing.</p>
          <div className="space-y-2">
            {[
              { reg: 'MH-12-AB-1234', slot: 'A-001', entry: '10:30 AM' },
              { reg: 'DL-01-CD-5678', slot: 'A-003', entry: '09:15 AM' },
              { reg: 'KA-05-EF-9012', slot: 'B-002', entry: '08:45 AM' },
            ].map((vehicle) => (
              <div key={vehicle.reg} className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded">
                <div>
                  <div className="font-medium">{vehicle.reg}</div>
                  <div className="text-sm text-gray-600">Slot: {vehicle.slot} | Entry: {vehicle.entry}</div>
                </div>
                <button className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200">
                  Process Exit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleExit;
