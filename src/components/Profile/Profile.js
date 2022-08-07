import React from "react";
import "./Profile.css";

const Profile = () => {
  const user = localStorage.getItem("user")

  const parsedUser = JSON.parse(user)

  return (
    <div className="profile-div-container">
      <div className="profile-details-div">
        <label className="profile-details-label">Username:</label>
        <p>{parsedUser.username}</p>
      </div>
      <div className="profile-details-div">
        <label className="profile-details-label">Email:</label>
        <p>{parsedUser.email}</p>
      </div>
    </div>
  );
};

export default Profile;
