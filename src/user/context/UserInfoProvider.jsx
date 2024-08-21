import React, { createContext } from "react";
import { useState, useEffect } from "react";

const UserContext = createContext();
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [role, setRole] = useState("");

  const token = localStorage.getItem("token");

  const fetchUserInfo = async () => {
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
      setRole(data.roles.name);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  useEffect(() => {
    if (!token) {
      setUserInfo(null);
    }
  }, [token]);
  const contextValue = [userInfo, fetchUserInfo, role];

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export default UserContext;
