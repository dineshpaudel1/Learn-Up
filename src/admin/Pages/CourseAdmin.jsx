// CourseAdmin.jsx
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import icons
import { fetchCourses, deleteCourse } from "../Apis/CourseApi"; // Import fetch and delete functions
import AddCourseModal from "../Model/AddCourseModel"; // Import the AddCourseModal component

const CourseAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    // Fetch courses using the function from CourseApi.jsx
    const getCourses = async () => {
      const courseData = await fetchCourses();
      setCourses(courseData);
    };

    getCourses();
  }, []);

  // Function to handle course deletion
  const handleDeleteCourse = async (id) => {
    if (!accessToken) {
      console.error("Access token not found!");
      return;
    }

    const isDeleted = await deleteCourse(id, accessToken);
    if (isDeleted) {
      setCourses(courses.filter((course) => course.id !== id)); // Remove the deleted course from state
    } else {
      console.error("Failed to delete course");
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Courses</h2>
        <button
          className="bg-green-500 text-white p-3 rounded flex items-center"
          onClick={() => setIsModalOpen(true)} // Open modal on button click
        >
          <FaPlus className="mr-2" /> Add Course
        </button>
      </div>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Photo</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-t">
              <td className="px-4 py-2">
                <img
                  src={`http://localhost:8080/${course.thumbnail}`}
                  alt={course.courseTitle}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{course.courseTitle}</td>
              <td className="px-4 py-2">{course.courseDescription}</td>
              <td className="px-4 py-2">{course.category}</td>
              <td className="px-4 py-2">${course.price}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button className="bg-blue-500 text-white p-2 rounded flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded flex items-center"
                  onClick={() => handleDeleteCourse(course.id)} // Handle delete on button click
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the AddCourseModal */}
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CourseAdmin;
