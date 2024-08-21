import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayout";
import Home from "./user/Page/Home";
import Login from "./user/login/Login";
import Signup from "./user/Signup/Signup";
import Profile from "./user/Page/Profile";
import { UserInfoProvider } from "./user/context/UserInfoProvider";
import AdminLayout from "./AdminLayout";
import Dashboard from "./admin/Pages/Dashboard";
import DHome from "./admin/Pages/DHome";
import Coursedetail from "./user/Page/Coursedetail";

function App() {
  return (
    <>
      <UserInfoProvider>
        <Router>
          {" "}
          {/* Add the Router here */}
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/coursedetail" element={<Coursedetail />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="good" element={<DHome />} />
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>{" "}
        {/* Close the Router here */}
      </UserInfoProvider>
    </>
  );
}

export default App;
