import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png"; // Adjust the path to your logo image

const Header = () => {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              to="/categories"
              className="text-gray-600 hover:text-gray-800"
            >
              Categories
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-1 px-4 text-gray-600"
          />
          {username ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-600 hover:text-gray-800 flex items-center text-lg py-2 focus:outline-none"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={closeDropdown}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeDropdown();
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-800">
                Log in
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-gray-800">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
