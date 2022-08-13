import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ error }) => {
  return <p className="error-message">{error}</p>;
};

export default ErrorMessage;
