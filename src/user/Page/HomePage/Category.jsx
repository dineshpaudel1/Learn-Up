import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../components/Apis/CategoryApi";

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

      {/* Scrollable container with fixed height and width */}
      <div className="w-[1200px] h-[400px] overflow-y-scroll mt-6 px-[70px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{ width: "250px", height: "250px" }} // Optional fixed size for each category card
            >
              <img
                src={`http://localhost:8080/${category.categoryPhoto}`}
                alt={category.categoryName}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-center">
                {category.categoryName}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
