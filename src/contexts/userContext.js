import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const UserUpdateContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
