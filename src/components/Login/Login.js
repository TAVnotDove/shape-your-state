import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-form-div">
      <form>
        <div className="login-field-div">
          <label className="login-form-label">Email</label>
          <input></input>
        </div>
        <div className="login-field-div">
          <label className="login-form-label">Password</label>
          <input></input>
        </div>
      </form>
    </div>
  );
};

export default Login;
