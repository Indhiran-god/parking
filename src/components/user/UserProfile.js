import React from 'react';

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile & Settings</h1>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
            <p className="text-purple-800">
              Manage your personal and vehicle-related details, update contact information, and change your password.
            </p>
          </div>
          
          <div className="text-center py-12 text-gray-500">
            User profile functionality will be implemented here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
