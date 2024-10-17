import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import close icon

const AddCourseModal = ({ isOpen, onClose }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Thumbnail as a file input
  const [rating, setRating] = useState("");

  const accessToken = localStorage.getItem("token"); // Retrieve token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("courseTitle", courseTitle);
    formData.append("courseDescription", courseDescription);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("thumbnail", thumbnail); // Image file
    formData.append("rating", rating);

    try {
      const response = await fetch("http://localhost:8080/api/admin/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const data = await response.json();
      console.log("Course added:", data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Course</h2>
          <button onClick={onClose} className="text-red-500">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Course Description
            </label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              max="5"
              min="0"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded mt-4"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
