import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axiosInstance from "../Utils/axiosInstance";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/api/v1/auth/getUser", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user || res.data); // Adjust based on your backend response
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            // Clear invalid token
            localStorage.removeItem("token");
            setUser(null);
          } else {
            console.error("Cannot connect to server. Please try again later.");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const updateUser = (userData) => setUser(userData);
  const clearUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;