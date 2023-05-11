import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { ThemeContext } from "../../contexts/themeContext"

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const theme = useContext(ThemeContext)

  return (
    <div className={`profile-div-container-${theme}`}>
      <div className={`profile-details-div-${theme}`}>
        <label className={`profile-details-label-${theme}`}>Username:</label>
        <p className={`profile-details-text-${theme}`}>{user.username}</p>
      </div>
      <div className={`profile-details-div-${theme}`}>
        <label className={`profile-details-label-${theme}`}>Email:</label>
        <p className={`profile-details-text-${theme}`}>{user.email}</p>
      </div>
      <div className={`profile-details-div-${theme}`}>
        <label className={`profile-details-label-${theme}`}>Created on:</label>
        <p className={`profile-details-text-${theme}`}>
          {String(new Date(user._createdOn)).substring(4, 24)}
        </p>
      </div>
      <Link to="/profile/settings">Settings</Link>
    </div>
  );
};

export default Profile;
