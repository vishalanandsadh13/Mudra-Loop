import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axiosInstance from "../Utils/axiosInstance";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

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
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const updateUser = (userData) => setUser(userData);
  const clearUser = () => setUser(null);

  return (
    <userContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;