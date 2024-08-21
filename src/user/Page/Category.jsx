import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Trending Categories</h2>
      <br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.id} // Assuming the category object has an 'id' property
            className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={`http://localhost:8080/${category.categoryPhoto}`}
              alt={category.name}
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
