import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-div">
      <div className="profile-details-div">
        <label className="profile-details-label">Email:</label>
        <p>example@domain.extension</p>
      </div>
      <div className="profile-details-div">
        <label className="profile-details-label">Username:</label>
        <p>User Name</p>
      </div>
    </div>
  );
};

export default Profile;
