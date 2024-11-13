import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../components/Apis/CategoryApi"; // Import from CategoryApi.jsx

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories.");
      }
    };

    loadCategories();
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <h2 className="text-3xl mt-5 font-bold text-gray-800 text-center">
        Trending Categories
        <div className="mx-auto flex mt-4 w-16 h-1 bg-[#8594] rounded-full"></div>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-[70px] w-[1200px] h-[200px] mt-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={`http://localhost:8080/${category.categoryPhoto}`}
              alt={category.categoryName}
              className="w-24 h-24 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold">{category.categoryName}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
