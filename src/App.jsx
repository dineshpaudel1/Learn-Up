import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayout";
import Home from "./user/Page/Home";
import Login from "./user/login/Login";
import Signup from "./user/Signup/Signup";
import Profile from "./user/Page/Profile";
import { UserInfoProvider } from "./user/context/UserInfoProvider";
import AdminLayout from "./AdminLayout";
import Dashboard from "./admin/Dashobard/Dashboard";
import Coursedetail from "./user/Page/Coursedetail";
import CourseAdmin from "./admin/CourseAdmin/CourseAdmin";
function App() {
  return (
    <>
      <UserInfoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/coursedetail" element={<Coursedetail />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="courseadmin" element={<CourseAdmin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserInfoProvider>
    </>
  );
}

export default App;
