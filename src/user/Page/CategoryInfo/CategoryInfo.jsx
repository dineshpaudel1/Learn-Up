// CategoryInfo.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryById } from "../../../components/Apis/CategoryApi"; // Import the fetchCategoryById function

const CategoryInfo = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategoryById(id)
      .then((data) => {
        setCategory(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error fetching category details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-8 mt-9">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Category Details
        <div className="mx-auto flex mt-4 w-16 h-1 bg-[#8594] rounded-full"></div>
      </h2>

      {category ? (
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg w-full max-w-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={`http://localhost:8080/${category.categoryPhoto}`}
              alt={category.categoryName}
              className="w-48 h-48 object-contain mb-6"
            />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {category.categoryName}
            </h3>
            <p className="text-gray-700 text-center">
              {category.categoryDescription}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-600">
          No details available for this category.
        </div>
      )}
    </div>
  );
};

export default CategoryInfo;
