import React, { useState } from "react";

const SettingAdmin = () => {
  // State for form inputs
  const [profile, setProfile] = useState({
    fullName: "Dinesh Paudel",
    username: "dineshpaudel",
    email: "dinesh@example.com",
    contact: "123-456-7890",
    photo: "https://via.placeholder.com/150", // Placeholder image
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  // Handlers for profile form
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  // Handle file upload for photo
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate uploading the photo and getting a URL
      const reader = new FileReader();
      reader.onload = (upload) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          photo: upload.target.result, // Use base64 URL as the image source
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    alert("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic
    if (passwords.newPassword === passwords.confirmPassword) {
      alert("Password updated successfully!");
    } else {
      alert("New passwords do not match!");
    }
  };

  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    // Handle notifications update
    alert("Notification settings updated!");
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      {/* Profile Settings */}
      <div className="mb-10">
        <h3 className="text-2xl mb-4">Profile Settings</h3>
        <form onSubmit={handleProfileSubmit}>
          {/* Profile Photo */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Profile Photo</label>
            <div className="flex items-center space-x-4">
              <img
                src={profile.photo}
                alt="Profile"
                className="w-20 h-20 object-cover rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full p-2 border rounded"
              />
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

      {/* Notifications */}
      <div className="mb-10">
        <h3 className="text-2xl mb-4">Notification Settings</h3>
        <form onSubmit={handleNotificationsSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Email Notifications
            </label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationChange}
            />{" "}
            Enable Email Notifications
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              SMS Notifications
            </label>
            <input
              type="checkbox"
              name="smsNotifications"
              checked={notifications.smsNotifications}
              onChange={handleNotificationChange}
            />{" "}
            Enable SMS Notifications
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Notifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingAdmin;
