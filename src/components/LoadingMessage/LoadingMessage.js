import React, { useContext } from "react";
import "./LoadingMessage.css";
import { ThemeContext } from "../../contexts/themeContext"

const LoadingMessage = () => {
  const theme = useContext(ThemeContext)

  return <p className={`loading-message-${theme}`}>Loading...</p>;
};

export default LoadingMessage;
