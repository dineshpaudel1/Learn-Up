import React, { useState, useEffect } from "react";
import {
  fetchUserInfo,
  updatePassword,
  updateUserInfo,
  updateUserPhoto,
} from "../../components/Apis/UserApi"; // Import API functions

const BASE_URL = "http://localhost:8080";

const SettingAdmin = () => {
  // State for form inputs
  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    email: "",
    contact: "",
    photo: "",
    role: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data on mount
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

    fetchProfileData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
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

  // Submit password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await updatePassword(
        profile.id,
        passwords.currentPassword,
        passwords.newPassword,
        token
      );
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="w-[1000px] h-[600px] overflow-auto p-10">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      {/* Profile Settings */}
      <div className="mb-10">
        <h3 className="text-2xl mb-4">Profile Settings</h3>
        <form onSubmit={handleProfileSubmit}>
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

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Change */}
      <div className="mb-10">
        <h3 className="text-2xl mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingAdmin;
