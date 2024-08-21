import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      setToken(token);

      try {
        const response = await fetch("http://localhost:8080/api/user/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  if (!userInfo)
    return <div className="text-center">No user data available</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

      <div className="flex justify-center mb-4">
        <img
          src={"http://localhost:8080" + userInfo.name}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />
      </div>

      <div className="space-y-4">
        <p>
          <strong className="block text-gray-600">Full Name:</strong>
          <span className="text-gray-800">{userInfo.fullName || "N/A"}</span>
        </p>
        <p>
          <strong className="block text-gray-600">Username:</strong>
          <span className="text-gray-800">{userInfo.username || "N/A"}</span>
        </p>
        <p>
          <strong className="block text-gray-600">Email:</strong>
          <span className="text-gray-800">{userInfo.email || "N/A"}</span>
        </p>
        <p>
          <strong className="block text-gray-600">Contact:</strong>
          <span className="text-gray-800">{userInfo.contact || "N/A"}</span>
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
          onClick={() => alert("Update profile feature coming soon!")}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
