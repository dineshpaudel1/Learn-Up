import React from "react";
import Sidebar from "././components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import AdminNav from "./components/Sidebar/AdminNav";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <AdminNav />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
