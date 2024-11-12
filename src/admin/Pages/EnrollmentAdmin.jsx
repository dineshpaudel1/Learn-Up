import React, { useEffect, useState } from "react";
import axios from "axios";

const EnrollmentAdmin = () => {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

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
          setEnrolledUsers(response.data); // Assuming response data contains a list of enrolled users
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

  if (loading) return <p>Loading enrolled users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Enrolled Users</h2>
      {enrolledUsers.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Title
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolledUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user.courseTitle}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user.instructor}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No enrolled users found.</p>
      )}
    </div>
  );
};

export default EnrollmentAdmin;
