import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import AddUserModal from "../Model/AddUserModel";

// import AddUserModel from "../Model/AddUserModel";
const EnrollmentAdmin = () => {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false); // State to control AddUserModal visibility
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/showEnroll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setEnrolledUsers(response.data);
        } else {
          setError("Failed to fetch enrolled users.");
        }
      } catch (error) {
        console.error("Error fetching enrolled users:", error);
        setError("An error occurred while fetching enrolled users.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledUsers();
  }, [token]);

  const handleAddUser = (newUser) => {
    setEnrolledUsers([...enrolledUsers, newUser]);
    setShowAddModal(false);
  };

  const handleEditUser = (id) => {
    // Add logic to edit user here
    console.log("Edit user with ID:", id);
  };

  const handleDeleteUser = (id) => {
    setEnrolledUsers(enrolledUsers.filter((user) => user.id !== id));
  };

  if (loading) return <p>Loading enrolled users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Enrolled Users</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white p-3 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Make Enroll
        </button>
      </div>

      <div className="overflow-x-auto w-full max-w-[930px] max-h-[430px]">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Course Title</th>
              <th className="px-4 py-2">Instructor</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrolledUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.courseTitle}</td>
                <td className="px-4 py-2">{user.instructor}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="bg-blue-500 text-white p-2 rounded flex items-center"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white p-2 rounded flex items-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddUserModal
          isOpen={showAddModal} // Pass as isOpen
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default EnrollmentAdmin;
