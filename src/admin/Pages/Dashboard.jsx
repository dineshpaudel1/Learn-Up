import React, { useEffect, useState } from "react"; // Importing hooks
import {
  FaUser,
  FaBook,
  FaChalkboardTeacher,
  FaClipboardList,
  FaRegFileAlt,
} from "react-icons/fa"; // Importing icons
import { fetchCourses } from "../../components/Apis/CourseApi"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const [courseCount, setCourseCount] = useState(0); // State to hold total courses
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses(); // Fetch the courses
      setCourseCount(data.length); // Set the course count based on the fetched data
    };

    getCourses();
  }, []); // Empty dependency array to run only on component mount

  const handleTotalCourseClick = () => {
    navigate("/admin/courseadmin"); // Navigate to CourseAdmin page on click
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
        className="bg-gray-600 p-6 rounded-lg text-white text-center shadow-md cursor-pointer"
        onClick={handleTotalCourseClick} // Add onClick handler
      >
        <FaBook className="text-4xl mb-2 mx-auto" /> {/* Book Icon */}
        <h2 className="text-2xl font-bold">Total User</h2>
        <p className="text-lg">{courseCount}</p>{" "}
        {/* Display the dynamic course count */}
      </div>
    </div>
  );
};

export default Dashboard;
