import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { updateCourse } from "../../components/Apis/CourseApi";

const EditCourseModal = ({ isOpen, course, onClose }) => {
  const accessToken = localStorage.getItem("token");
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    courseDescription: "",
    category: "",
    price: 0,
    rating: 0,
    instructor: "", // Added instructor field
    language: "", // Added language field
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) {
      setCourseData({
        courseTitle: course.courseTitle || "",
        courseDescription: course.courseDescription || "",
        category: course.category || "",
        price: course.price || 0,
        rating: course.rating || 0,
        instructor: course.instructor || "", // Pre-fill instructor
        language: course.language || "", // Pre-fill language
      });
    } else {
      setCourseData({
        courseTitle: "",
        courseDescription: "",
        category: "",
        price: 0,
        rating: 0,
        instructor: "", // Reset instructor
        language: "", // Reset language
      });
    }
  }, [course]);

  const handleInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedCourse = await updateCourse(
        course.id,
        courseData,
        thumbnail,
        accessToken
      );
      console.log("Course updated:", updatedCourse);
      onClose();
    } catch (error) {
      console.error("Error updating course:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Course</h2>
          <button onClick={handleClose} className="text-red-500">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="courseTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Course Title
            </label>
            <input
              id="courseTitle"
              name="courseTitle"
              value={courseData.courseTitle}
              onChange={handleInputChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="courseDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Course Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={courseData.courseDescription}
              onChange={handleInputChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={courseData.price}
              onChange={handleInputChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="instructor"
              className="block text-sm font-medium text-gray-700"
            >
              Instructor
            </label>
            <input
              id="instructor"
              name="instructor"
              value={courseData.instructor}
              onChange={handleInputChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <input
              id="language"
              name="language"
              value={courseData.language}
              onChange={handleInputChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail
            </label>
            <input
              id="thumbnail"
              type="file"
              onChange={handleThumbnailChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              value={courseData.rating}
              onChange={handleInputChange}
              max="5"
              min="0"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-3 rounded mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
