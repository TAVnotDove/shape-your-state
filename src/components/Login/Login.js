import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="loginFormDiv">
      <form>
        <div className="formDiv">
          <label className="formLabel">Email</label>
          <input></input>
        </div>
        <div className="formDiv">
          <label className="formLabel">Password</label>
          <input></input>
        </div>
      </form>
    </div>
  );
};

export default Login;
