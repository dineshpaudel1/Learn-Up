// components/Apis/EnrollmentApi.js

import axios from "axios"; // Ensure axios is imported

export const fetchEnrolledUserCount = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/showEnroll", {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authorization
      },
    });

    // Assuming the response contains an array of enrolled users, we count the length
    return response.data.length; // If the response contains an array of enrolled users
  } catch (error) {
    console.error("Error fetching enrolled user count:", error);
    return 0; // Return 0 if there's an error
  }
};
