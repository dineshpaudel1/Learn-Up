import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayout";
import Home from "./user/Page/Home";
import Login from "./components/login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./user/Page/Profile";
import { UserInfoProvider } from "./user/context/UserInfoProvider";
import AdminLayout from "./AdminLayout"; // Update the path if necessary
import Dashboard from "./admin/Pages/Dashboard";
import Coursedetail from "./user/Page/Coursedetail";
import CourseAdmin from "./admin/Pages/CourseAdmin";
import StudentAdmin from "./admin/Pages/StudentAdmin";
import SettingAdmin from "./admin/Pages/SettingAdmin";
import TeacherAdmin from "./admin/Pages/TeacherAdmin";

function App() {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="coursedetail" element={<Coursedetail />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courseadmin" element={<CourseAdmin />} />
            <Route path="studentadmin" element={<StudentAdmin />} />
            <Route path="teacheradmin" element={<TeacherAdmin />} />
            <Route path="settingadmin" element={<SettingAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
