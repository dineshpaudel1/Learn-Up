import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Import close icon
import { addCourse } from "../../../components/Apis/CourseApi"; // Import the addCourse function

const AddCourseModal = ({ isOpen, onClose, refreshCourses }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [rating, setRating] = useState("");
  const [instructor, setInstructor] = useState("");
  const [language, setLanguage] = useState("");
  const [videoLink, setvideoLink] = useState("");
  const [categories, setCategories] = useState([]); // State to hold categories
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const accessToken = localStorage.getItem("token");

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/category"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data); // Set the categories in the state
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false once the fetch completes
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    const courseData = {
      courseTitle,
      courseDescription,
      category,
      price,
      rating,
      instructor,
      language,
      videoLink,
    };

    try {
      const data = await addCourse(courseData, thumbnail, accessToken);
      console.log("Course added:", data);
      onClose();
      refreshCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleClose = () => {
    onClose();
    refreshCourses();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Course</h2>
          <button onClick={handleClose} className="text-red-500">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instructor
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video Link
            </label>
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setvideoLink(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
