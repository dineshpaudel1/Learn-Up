import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCategoryModal = ({
  isOpen,
  onClose,
  categoryId,
  initialData,
  onEditCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryPhoto, setCategoryPhoto] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (initialData) {
      setCategoryName(initialData.categoryName);
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    setCategoryPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", JSON.stringify({ categoryName }));
    if (categoryPhoto) {
      formData.append("file", categoryPhoto);
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${categoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        onEditCategory(response.data);
        onClose();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryPhoto" className="block text-gray-700">
              Category Photo (optional)
            </label>
            <input
              type="file"
              id="categoryPhoto"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
