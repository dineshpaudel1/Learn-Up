import React, { useEffect, useState } from "react";
import notification from "../../assets/notifi.webp";
import { fetchUserInfo } from "../../components/Apis/UserApi"; // Adjust path if necessary
import { Link } from "react-router-dom";

const AdminNav = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserInfo(token);
        // console.log("Response Data:", data); // Log the received data
        setUserInfo(data);
      } catch (error) {
        console.error("Fetch Error:", error); // Log the fetch error
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div>
      <main className="flex-1 p-5 text-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-400 p-2 rounded w-100 h-10"
            />
            <img
              src={notification}
              alt="Notifications"
              className="ml-4 p-2 w-10 h-10"
            />
            <div className="ml-4 flex items-center">
              <Link to="settingadmin" className="flex items-center">
                {userInfo.name ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={"http://localhost:8080" + userInfo.name}
                    alt="Profile"
                  />
                ) : (
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../assets/default-profile.png"
                    alt="Default Profile"
                  />
                )}
                <span className="ml-2">{userInfo.username || "Guest"}</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Render the rest of the content */}
      </main>
    </div>
  );
};

export default AdminNav;
