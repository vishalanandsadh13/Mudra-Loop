import React, { useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext()


const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set user data
  const updateUser = (userData) => {
    setUser(userData);
  };
  // Function to clear user data
  const clearUser = () => {
    setUser(null);
  };
  return (
    <userContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
