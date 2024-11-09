import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Login API function
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Fetch all user info
export const fetchAllUserInfo = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};

// Fetch individual user info
export const fetchUserInfo = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/info`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// Signup function
export const signupUser = async (
  fullName,
  username,
  email,
  contact,
  password
) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, username, email, contact, password }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }
  return await response.json();
};

// Update password function
export const updatePassword = async (
  id,
  password,
  newPassword,
  accessToken
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/user/updatePassword`,
      { id, password, newPassword },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Password update failed");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error(error.response?.data?.message || "Password update failed");
  }
};

export const updateUserInfo = async (profileData, accessToken) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/user/updateInfo`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update user info"
    );
  }
};

// Update user photo
export const updateUserPhoto = async (photoFile, accessToken) => {
  const formData = new FormData();
  formData.append("photo", photoFile);

  try {
    const response = await axios.put(
      `${BASE_URL}/api/user/updatePhoto`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user photo:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update user photo"
    );
  }
};

export const fetchTotalUserCount = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Assuming response.data is an array of users
    const userCount = response.data.length;
    return userCount;
  } catch (error) {
    console.error("Error fetching total user count:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user count"
    );
  }
};
