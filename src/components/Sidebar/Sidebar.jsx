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
            <Link to="studentadmin">
              <li className="p-4 hover:bg-blue-700">Students</li>
            </Link>
            <Link to="teacheradmin">
              <li className="p-4 hover:bg-blue-700">Teachers</li>
            </Link>
            <Link to="settingadmin">
              <li className="p-4 hover:bg-blue-700">Settings</li>
            </Link>
          </ul>
        </nav>
        <div className="p-6">
          <button className="w-full bg-red-700 py-2" onClick={handleLogout}>
            <Link to="/">
              <li>Logout</li>
            </Link>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
