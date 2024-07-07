import React from "react";
import bg from "../../assets/bg.jpg";

const HomePage = () => {
  return (
    <div className="font-sans bg-gray-100">
      <div
        className="relative text-white py-16"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(102, 79, 79, 0.5)", // Light black overlay
            zIndex: 1,
          }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1
            className="text-4xl font-bold"
            style={{
              color: "#ffffff",
            }} // Customize text color here
          >
            Learn Anytime, Anywhere
          </h1>
          <p
            className="mt-4 text-lg"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              color: "#ffffff",
            }} // Customize text color here
          >
            Explore thousands of courses to boost your career or personal growth
          </p>
          <button
            className="mt-6 px-6 py-3 rounded-md"
            style={{
              backgroundColor: "#4CAF50", // Customize button background color here
              color: "#FFFFFF", // Customize button text color here
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Categories */}
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

      {/* Courses */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Course Card */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <img
              src={bg}
              alt="Course"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 font-bold text-lg">Course Title</h3>
            <p className="mt-2 text-gray-600">
              Short course description goes here.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Enroll Now
            </button>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <img
              src={bg}
              alt="Course"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 font-bold text-lg">Course Title</h3>
            <p className="mt-2 text-gray-600">
              Short course description goes here.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Enroll Now
            </button>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <img
              src={bg}
              alt="Course"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 font-bold text-lg">Course Title</h3>
            <p className="mt-2 text-gray-600">
              Short course description goes here.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Enroll Now
            </button>
          </div>
          {/* Repeat above course card as needed */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
