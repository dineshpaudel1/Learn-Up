import React from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    Navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 h-full bg-blue-600 text-white flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>
        <nav className="flex-1 mt-6">
          <ul>
            <Link to="dashboard">
              <li className="p-4 hover:bg-blue-700">Dashboard</li>
            </Link>
            <Link to="courseadmin">
              <li className="p-4 hover:bg-blue-700">Courses</li>
            </Link>
            <Link to="categoryadmin">
              <li className="p-4 hover:bg-blue-700">Categories</li>
            </Link>
            <Link to="enrollmentadmin">
              <li className="p-4 hover:bg-blue-700">Enrollment</li>
            </Link>
            <Link to="useradmin">
              <li className="p-4 hover:bg-blue-700">User</li>
            </Link>
            <Link to="settingadmin">
              <li className="p-4 hover:bg-blue-700">Settings</li>
            </Link>
          </ul>
        </nav>
        <div className="p-6">
          <button
            className="w-[170px] bg-red-500 py-3 rounded-[5px]"
            onClick={handleLogout}
          >
            <Link to="/">Logout</Link>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
