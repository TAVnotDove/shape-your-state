import React, { useContext } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { UserUpdateContext } from "../../contexts/userContext";

const Logout = () => {
  const navigate = useNavigate();
  const setState = useContext(UserUpdateContext);

  function logoutUser(e) {
    if (e.target.textContent === "Yes") {
      localStorage.clear();
      setState(null);
      
      navigate("/", {replace: true});
    }
  }

  return (
    <div className="logout-div">
      <p className="logout-text">Are you sure you want to logout?</p>
      <button onClick={logoutUser}>Yes</button>
    </div>
  );
};

export default Logout;
