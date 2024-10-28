import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  fetchCourses,
  deleteCourse,
  updateCourse,
} from "../../components/Apis/CourseApi";
import AddCourseModal from "../Model/AddCourseModel";
import EditCourseModal from "../Model/EditCourseModel";

const CourseAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const accessToken = localStorage.getItem("token");

  const getCourses = async () => {
    const courseData = await fetchCourses();
    setCourses(courseData);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleDeleteCourse = async (id) => {
    if (!accessToken) {
      console.error("Access token not found!");
      return;
    }

    const isDeleted = await deleteCourse(id, accessToken);
    if (isDeleted) {
      setCourses(courses.filter((course) => course.id !== id));
    } else {
      console.error("Failed to delete course");
    }
  };

  const handleUpdateCourse = async (updatedCourseData, thumbnail) => {
    if (!accessToken || !selectedCourse) {
      console.error("Access token or course not found!");
      return;
    }

    try {
      await updateCourse(
        selectedCourse.id,
        updatedCourseData,
        thumbnail,
        accessToken
      );
      await getCourses();
      setIsEditModalOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  const handleCourseAdded = async () => {
    await getCourses();
    setIsAddModalOpen(false);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Courses</h2>
        <button
          className="bg-green-500 text-white p-3 rounded flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FaPlus className="mr-2" /> Add Course
        </button>
      </div>

      {/* Scrollable table container with fixed width */}
      <div className="overflow-x-auto w-full max-w-[930px] max-h-[430px]">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Instructor</th>
              <th className="px-4 py-2">Language</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td>
                  <img
                    src={`http://localhost:8080/${course.thumbnail}`}
                    alt={course.courseTitle}
                    className="w-30 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {course.courseTitle}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {course.courseDescription}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {course.category}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">${course.price}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {course.instructor}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {course.language}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white p-2 rounded flex items-center"
                    onClick={() => handleEditCourse(course)}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded flex items-center"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCourseAdded={handleCourseAdded}
      />

      {selectedCourse && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          course={selectedCourse}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateCourse={handleUpdateCourse}
        />
      )}
    </div>
  );
};

export default CourseAdmin;
