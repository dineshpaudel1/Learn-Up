import React from "react";
import Header from "./components/Header/Header";
import "./index.css";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Page/Home";
import Profile from "./components/Page/Profile";
import { UserInfoProvider } from "./components/context/UserInfoProvider";
import Admin from "./components/Page/Admin";
function App() {
  return (
    <>
      <UserInfoProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="container mx-auto py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserInfoProvider>
    </>
  );
}

export default App;
