import React from "react";

const Category = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800">Popular Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h3 className="font-bold text-lg">Development</h3>
          <p className="mt-2 text-gray-600">
            Learn programming, web development, and more.
          </p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h3 className="font-bold text-lg">Design</h3>
          <p className="mt-2 text-gray-600">
            Explore graphic design, UX/UI design, and more.
          </p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h3 className="font-bold text-lg">Marketing</h3>
          <p className="mt-2 text-gray-600">
            Master digital marketing, SEO, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Category;
