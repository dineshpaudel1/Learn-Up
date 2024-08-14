import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png"; // Adjust the path to your logo image
import axios from "axios";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch categories
    axios
      .get("http://localhost:8080/api/users/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
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

  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const closeCategoryDropdown = () => {
    setCategoryDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-4">
            <div className="relative">
              <button
                onClick={toggleCategoryDropdown}
                className="text-gray-600 hover:text-gray-800 flex items-center focus:outline-none"
              >
                Categories
                <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
              </button>
              {categoryDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                  onMouseLeave={closeCategoryDropdown}
                >
                  {categories.map((category) => (
                    <Link
                      key={category.id} // Assuming category object has 'id' property
                      to={`/categories/${category.id}`} // Adjust the link path as needed
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={closeCategoryDropdown}
                    >
                      {category.categoryName}{" "}
                      {/* Assuming 'categoryName' is the category's name */}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
