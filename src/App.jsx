import React from "react";
import Header from "./components/Header/Header";
import "./index.css";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup"; // Assuming you have a Signup component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
