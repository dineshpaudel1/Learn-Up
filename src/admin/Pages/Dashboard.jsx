import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="p-4 hover:bg-blue-700">
              <a href="#">Dashboard</a>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <a href="#">Team</a>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <a href="#">Projects</a>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <a href="#">Calendar</a>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <a href="#">Documents</a>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <a href="#">Reports</a>
            </li>
          </ul>
        </nav>

        <div className="p-6">
          <Link to="/" className="flex items-center">
            <button
              className="w-full bg-blue-800 py-2 rounded mt-9"
              onClick={() => {
                handleLogout();
                closeDropdown();
              }}
            >
              Logout
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-10 text-gray-700">
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

        <div className="mt-10">
          {/* Content goes here */}
          <div className="bg-white h-96 rounded-lg shadow-md">
            <div className="h-full grid place-items-center text-gray-400">
              Content Area
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
