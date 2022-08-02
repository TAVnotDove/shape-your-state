import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-form-div">
      <form>
        <div className="register-field-div">
          <label className="register-form-label">Email</label>
          <input></input>
        </div>
        <div className="register-field-div">
          <label className="register-form-label">Username</label>
          <input></input>
        </div>
        <div className="register-field-div">
          <label className="register-form-label">Password</label>
          <input></input>
        </div>
        <div className="register-field-div">
          <label className="register-form-label">Re-Password</label>
          <input></input>
        </div>
      </form>
    </div>
  );
};

export default Register;
