import React, { useState, useEffect } from "react";
import {
  fetchUserInfo,
  updateUserInfo,
  updateUserPhoto,
} from "../.././components/Apis/UserApi"; // Adjust the path as needed

const BASE_URL = "http://localhost:8080";

const EditModal = ({ isOpen, onClose, userId }) => {
  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    email: "",
    contact: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserInfo(token);
        setProfile({
          ...data,
          photo: `${BASE_URL}${data.photo}`,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProfileData();
    }
  }, [isOpen]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        photo: URL.createObjectURL(file),
      }));
    }
  };

  // Submit updated profile information
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await updateUserInfo(profile, token);
      alert("Profile updated successfully!");
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Upload new profile photo
  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    const file = document.querySelector('input[type="file"]').files[0];
    if (file) {
      try {
        const token = localStorage.getItem("token");
        await updateUserPhoto(file, token);
        alert("Profile photo updated successfully!");
      } catch (error) {
        console.error("Error updating photo:", error);
        alert("Failed to update profile photo. Please try again.");
      }
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-full">
          <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
          <form onSubmit={handleProfileSubmit}>
            {/* Profile Photo */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Profile Photo</label>
              <div className="flex items-center space-x-4">
                <img
                  src={"http://localhost:8080" + profile.name}
                  alt={profile.fullName}
                  className="w-20 h-20 object-cover rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handlePhotoSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Photo
                </button>
              </div>
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Contact */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Contact</label>
              <input
                type="text"
                name="contact"
                value={profile.contact}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditModal;
