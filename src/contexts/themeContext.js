import React, { createContext, useState } from "react";

export const ThemeContext = createContext();
export const ThemeUpdateContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark");

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
