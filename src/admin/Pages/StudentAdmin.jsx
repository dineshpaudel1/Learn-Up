import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { fetchAllUserInfo } from "../../components/Apis/UserApi"; // Import the fetch function
import placeholderPhoto from "../../assets/teacher.webp"; // Placeholder image

const UserAdmin = () => {
  const [users, setUsers] = useState([]);

  // Fetch user data on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        // Retrieve the access token from localStorage
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        // Fetch the user data using the access token
        const userData = await fetchAllUserInfo(accessToken);

        // Map user data to add a placeholder photo if no photo is available
        const formattedUsers = userData.map((user) => ({
          ...user,
          photo: user.photo || placeholderPhoto, // Use user photo or placeholder
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Users</h2>
        <button className="bg-green-500 text-white p-3 rounded flex items-center">
          <FaPlus className="mr-2" /> Add User
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
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">
                <img
                  src={user.photo} // Use the user-specific photo
                  alt={user.fullName}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{user.fullName}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.contact}</td>
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

export default UserAdmin;
