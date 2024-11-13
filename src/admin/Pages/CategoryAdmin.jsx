import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import AddCategoryModal from "../Model/AddCategoryModal";
import {
  fetchCategories,
  fetchCategoryById,
} from "../../components/Apis/CategoryApi";
import axios from "axios";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowAddModal(false);
  };

  const handleEditCategory = async (id) => {
    try {
      const categoryData = await fetchCategoryById(id);
      console.log("Edit category data:", categoryData);
      // Add logic to open edit modal and handle updates
    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/users/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== id));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Categories</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white p-3 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto w-full max-w-[930px] max-h-[430px]">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3 text-left">Category Name</th>
              <th className="px-6 py-3 text-center">Image</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="px-6 py-4 text-left">{category.categoryName}</td>
                <td className="px-6 py-4 text-center">
                  <img
                    src={`http://localhost:8080/${category.categoryPhoto}`}
                    alt={category.categoryName}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEditCategory(category.id)}
                      className="bg-blue-500 text-white p-2 rounded flex items-center"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="bg-red-500 text-white p-2 rounded flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddCategoryModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddCategory={handleAddCategory}
        />
      )}
    </div>
  );
};

export default CategoryAdmin;
