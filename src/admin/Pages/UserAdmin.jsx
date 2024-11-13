import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { fetchAllUserInfo } from "../../components/Apis/UserApi"; // Import the fetch function
import placeholderPhoto from "../../assets/teacher.webp"; // Placeholder image
import AddUserModal from "../Model/AddUserModel";
import EditModal from "../Model/EditUserModel"; // Assuming EditModal is in the same directory

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false); // State to control AddUserModal visibility
  const [showEditModal, setShowEditModal] = useState(false); // State to control EditModal visibility
  const [userToEdit, setUserToEdit] = useState(null); // Store the user to be edited

  // Fetch user data on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const userData = await fetchAllUserInfo(accessToken);

        const formattedUsers = userData.map((user) => ({
          ...user,
          photo: user.photo || placeholderPhoto,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUsers();
  }, []);

  // Handle opening the Edit Modal and passing the user data to be edited
  const openEditModal = (user) => {
    setUserToEdit(user); // Set the user to be edited
    setShowEditModal(true); // Show the EditModal
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Users</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white p-3 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>

      {/* Scrollable table container with fixed dimensions */}
      <div className="overflow-x-auto w-full max-w-[930px] max-h-[430px]">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Roles</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={user.photo}
                    alt={user.fullName}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{user.fullName}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.username}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.contact}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {user.roles.length > 0
                    ? user.roles.map((role) => role.name).join(", ")
                    : "No Roles"}
                </td>

                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => openEditModal(user)} // Open the EditModal with user data
                    className="bg-blue-500 text-white p-2 rounded flex items-center"
                  >
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

      {/* Show AddUserModal if state is true */}
      {showAddModal && (
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Show EditModal if state is true */}
      {showEditModal && userToEdit && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={userToEdit} // Pass the selected user data to EditModal
        />
      )}
    </div>
  );
};

export default UserAdmin;
