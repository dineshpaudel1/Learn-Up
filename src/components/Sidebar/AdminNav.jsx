import React from "react";

const AdminNav = () => {
  return (
    <div>
      <main className="flex-1 p-10 text-gray-700">
        {/* Content area for different pages */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 p-2 rounded"
            />
            <button className="ml-4 p-2 bg-blue-600 text-white rounded">
              Notifications
            </button>
            <div className="ml-4 flex items-center">
              <img
                className="w-10 h-10 rounded-full"
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
              <span className="ml-2">Dinesh</span>
            </div>
          </div>
        </div>
        {/* Render the rest of the content */}
      </main>
    </div>
  );
};

export default AdminNav;
