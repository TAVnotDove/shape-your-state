import React, { useContext } from "react";
import "./RouteNotFound.css";
import { ThemeContext } from "../../contexts/themeContext"

const RouteNotFound = () => {
  const theme = useContext(ThemeContext)
  
  return (
    <div className="page-not-found-container">
      <div className={`page-not-found-message-${theme}`}>
        <h1>404 No Page Found</h1>
      </div>
    </div>
  );
};

export default RouteNotFound;
