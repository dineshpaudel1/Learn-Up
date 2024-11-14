import React, { useEffect, useState } from "react"; // Importing hooks
import {
  FaUser,
  FaBook,
  FaChalkboardTeacher,
  FaClipboardList,
  FaRegFileAlt,
} from "react-icons/fa"; // Importing icons
import { fetchCourses } from "../../components/Apis/CourseApi"; // Adjust the import path as necessary
import { fetchTotalUserCount } from "../../components/Apis/UserApi"; // Import user count function
import { fetchEnrolledUserCount } from "../../components/Apis/EnrollmentApi"; // Import the function to fetch enrolled user count
import { fetchCategories } from "../../components/Apis/CategoryApi"; // Import category count function
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const [courseCount, setCourseCount] = useState(0); // State to hold total courses
  const [userCount, setUserCount] = useState(0); // State to hold total users
  const [enrolledUserCount, setEnrolledUserCount] = useState(0); // State to hold total enrolled users
  const [categoryCount, setCategoryCount] = useState(0); // State to hold total categories
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses(); // Fetch the courses
      setCourseCount(data.length); // Set the course count based on the fetched data
    };
    const getCategoryCount = async () => {
      const data = await fetchCategories(); // Fetch the courses
      setCategoryCount(data.length); // Set the course count based on the fetched data
    };

    const getUsers = async () => {
      const accessToken = localStorage.getItem("token"); // Retrieve access token from localStorage
      if (accessToken) {
        const count = await fetchTotalUserCount(accessToken); // Fetch total user count
        setUserCount(count); // Set the user count based on fetched data
      }
    };

    const getEnrolledUsers = async () => {
      const accessToken = localStorage.getItem("token"); // Retrieve access token from localStorage
      if (accessToken) {
        const count = await fetchEnrolledUserCount(accessToken); // Fetch enrolled user count
        setEnrolledUserCount(count); // Set the enrolled user count based on fetched data
      }
    };

    getCourses();
    getUsers();
    getEnrolledUsers(); // Fetch enrolled user count
    getCategoryCount(); // Fetch category count
  }, []); // Empty dependency array to run only on component mount

  const handleTotalCourseClick = () => {
    navigate("/admin/courseadmin"); // Navigate to CourseAdmin page on click
  };

  const handleTotalUserClick = () => {
    navigate("/admin/useradmin"); // Navigate to UserAdmin page on click
  };

  const handleEnrolledUserClick = () => {
    navigate("/admin/enrollmentadmin"); // Navigate to Enrollment page on click
  };

  const handleCategoryClick = () => {
    navigate("/admin/categoryadmin"); // Navigate to CategoryAdmin page on click
  };

  return (
    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
      {/* Total Course */}
      <div
        className="bg-green-600 p-6 rounded-lg text-white text-center shadow-md cursor-pointer"
        onClick={handleTotalCourseClick} // Add onClick handler
      >
        <FaBook className="text-4xl mb-2 mx-auto" /> {/* Book Icon */}
        <h2 className="text-2xl font-bold">Total Course</h2>
        <p className="text-lg">{courseCount}</p>{" "}
        {/* Display the dynamic course count */}
      </div>
      <div
        className="bg-yellow-600 p-6 rounded-lg text-white text-center shadow-md cursor-pointer"
        onClick={handleCategoryClick} // Add onClick handler
      >
        <FaChalkboardTeacher className="text-4xl mb-2 mx-auto" />{" "}
        {/* Category Icon */}
        <h2 className="text-2xl font-bold">Total Categories</h2>
        <p className="text-lg">{categoryCount}</p>{" "}
        {/* Display the dynamic category count */}
      </div>
      <div
        className="bg-blue-600 p-6 rounded-lg text-white text-center shadow-md cursor-pointer"
        onClick={handleEnrolledUserClick} // Add onClick handler
      >
        <FaClipboardList className="text-4xl mb-2 mx-auto" />{" "}
        {/* Clipboard Icon */}
        <h2 className="text-2xl font-bold">Enrolled Users</h2>
        <p className="text-lg">{enrolledUserCount}</p>{" "}
        {/* Display the dynamic enrolled user count */}
      </div>

      {/* Total User */}
      <div
        className="bg-gray-600 p-6 rounded-lg text-white text-center shadow-md cursor-pointer"
        onClick={handleTotalUserClick} // Add onClick handler
      >
        <FaUser className="text-4xl mb-2 mx-auto" /> {/* User Icon */}
        <h2 className="text-2xl font-bold">Total User</h2>
        <p className="text-lg">{userCount}</p>{" "}
        {/* Display the dynamic user count */}
      </div>

      {/* Enrolled User */}

      {/* Total Categories */}
    </div>
  );
};

export default Dashboard;
