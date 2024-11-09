import React from "react";
import TeacherImage from "../../../assets/teacher.png";

const TeacherSection = () => {
  return (
    <div className="bg-custom-yellow mt-5 flex items-center justify-center min-h-[500px]">
      {/* Image Section */}
      <div className="relative w-64 h-64 bg-yellow-700 flex items-center justify-center rounded-md">
        <img
          src={TeacherImage}
          alt="Instructor"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="ml-10">
        <h2 className="text-3xl font-bold mb-4">Become an instructor</h2>
        <p className="text-gray-700 mb-6 max-w-md">
          Instructors from around the world teach millions of learners on Udemy.
          We provide the tools and skills to teach what you love.
        </p>
        <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">
          Start teaching today
        </button>
      </div>
    </div>
  );
};

export default TeacherSection;
