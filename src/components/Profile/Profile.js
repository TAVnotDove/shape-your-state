import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-div-container">
      <div className="profile-details-div">
        <label className="profile-details-label">Username:</label>
        <p className="profile-details-text">{user.username}</p>
      </div>
      <div className="profile-details-div">
        <label className="profile-details-label">Email:</label>
        <p className="profile-details-text">{user.email}</p>
      </div>
      <div className="profile-details-div">
        <label className="profile-details-label">Created on:</label>
        <p className="profile-details-text">
          {String(new Date(user._createdOn)).substring(4, 24)}
        </p>
      </div>
      <Link to="/profile/settings">Settings</Link>
    </div>
  );
};

export default Profile;
