import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import icons

const students = [
  {
    id: 1,
    photo: "https://via.placeholder.com/150", // Placeholder student image
    fullName: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    contact: "123-456-7890",
    password: "password123", // Not displayed in the table
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/150", // Placeholder student image
    fullName: "Jane Smith",
    username: "janesmith",
    email: "janesmith@example.com",
    contact: "987-654-3210",
    password: "password456", // Not displayed in the table
  },
];

const StudentAdmin = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Students</h2>
        <button className="bg-green-500 text-white p-3 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Student
        </button>
      </div>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Photo</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-2">
                <img
                  src={student.photo}
                  alt={student.fullName}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{student.fullName}</td>
              <td className="px-4 py-2">{student.username}</td>
              <td className="px-4 py-2">{student.email}</td>
              <td className="px-4 py-2">{student.contact}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button className="bg-blue-500 text-white p-2 rounded flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button className="bg-red-500 text-white p-2 rounded flex items-center">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAdmin;
