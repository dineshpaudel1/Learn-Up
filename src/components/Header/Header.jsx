// Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Learn-Up
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              to="/categories"
              className="text-gray-600 hover:text-gray-800"
            >
              Categories
            </Link>
            <Link to="/business" className="text-gray-600 hover:text-gray-800">
              Learn-Up Business
            </Link>
            <Link to="/teach" className="text-gray-600 hover:text-gray-800">
              Teach on Udemy
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-1 px-4 text-gray-600"
          />
          <Link to="/login" className="text-gray-600 hover:text-gray-800">
            Log in
          </Link>
          <Link to="/signup" className="text-gray-600 hover:text-gray-800">
            Sign up
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-800">
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
