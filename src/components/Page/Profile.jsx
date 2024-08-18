import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token,setToken] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      setToken(token)

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
        console.log(data)
        setUserInfo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!userInfo) return <div>No user data available</div>;

  return (
    <div>
      <h1>Profile</h1>
      <img src={userInfo.name} alt="User Profile" />
      <p>
        <strong>Full Name:</strong> {userInfo.fullName}
      </p>
      <p>
        <strong>Username:</strong> {userInfo.username}
      </p>
      <p>
        <strong>Email:</strong> {userInfo.email}
      </p>
      <p>
        <strong>Contact:</strong> {userInfo.contact}
      </p>
      <p>
        <strong>Role:</strong> {userInfo.roles.name}
      </p>
    </div>
  );
};

export default Profile;
