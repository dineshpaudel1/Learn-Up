import React from "react";
import {
  FaUser,
  FaBook,
  FaChalkboardTeacher,
  FaClipboardList,
  FaRegFileAlt,
} from "react-icons/fa"; // Importing icons

const Dashboard = () => {
  return (
    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
      {/* Total Course */}
      <div className="bg-red-500 p-6 rounded-lg text-white text-center shadow-md">
        <FaBook className="text-4xl mb-2 mx-auto" /> {/* Book Icon */}
        <h2 className="text-2xl font-bold">Total Course</h2>
        <p className="text-lg">100</p>{" "}
        {/* You can replace the value with dynamic data */}
      </div>

      {/* Total Student */}
      <div className="bg-green-500 p-6 rounded-lg text-white text-center shadow-md">
        <FaUser className="text-4xl mb-2 mx-auto" /> {/* User Icon */}
        <h2 className="text-2xl font-bold">Total Student</h2>
        <p className="text-lg">500</p>{" "}
        {/* You can replace the value with dynamic data */}
      </div>

      {/* Total Teacher */}
      <div className="bg-blue-500 p-6 rounded-lg text-white text-center shadow-md">
        <FaChalkboardTeacher className="text-4xl mb-2 mx-auto" />{" "}
        {/* Teacher Icon */}
        <h2 className="text-2xl font-bold">Total Teacher</h2>
        <p className="text-lg">50</p>{" "}
        {/* You can replace the value with dynamic data */}
      </div>

      {/* Total Enrollment */}
      <div className="bg-yellow-500 p-6 rounded-lg text-white text-center shadow-md">
        <FaClipboardList className="text-4xl mb-2 mx-auto" />{" "}
        {/* Enrollment Icon */}
        <h2 className="text-2xl font-bold">Total Enrollment</h2>
        <p className="text-lg">200</p>{" "}
        {/* You can replace the value with dynamic data */}
      </div>

      {/* Course Request */}
      <div className="bg-purple-500 p-6 rounded-lg text-white text-center shadow-md">
        <FaRegFileAlt className="text-4xl mb-2 mx-auto" /> {/* Request Icon */}
        <h2 className="text-2xl font-bold">Course Request</h2>
        <p className="text-lg">20</p>{" "}
        {/* You can replace the value with dynamic data */}
      </div>
    </div>
  );
};

export default Dashboard;
