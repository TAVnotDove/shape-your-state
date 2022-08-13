import React from "react";
import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  function onChange(e) {
    console.log(e.target.value)
  }

  return (
    <div className="profile-div-container">
      <div className="profile-details-div">
        <label className="profile-details-label">Username:</label>
        <p>{user.username}</p>
      </div>
      <div className="profile-details-div">
        <label className="profile-details-label">Email:</label>
        <p>{user.email}</p>
      </div>
      <div className="profile-details-div">
        <label className="profile-details-label">Theme:</label>
        <select id="posts-view-select" defaultValue={user.settings.theme} onChange={onChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="profile-details-div">
        <label className="profile-details-label">Posts order:</label>
        <select id="posts-view-select" defaultValue={user.settings.postsOrder} onChange={onChange}>
          <option value="recent">Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Profile;
