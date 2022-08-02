import React from "react";
import "./Register.css";
import userRegister from "../../services/userRegister";

const Register = () => {
  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const repeatPassword = formData.get("repeatPassword");

    if (password === repeatPassword) {
      userRegister(username, email, password);
    }
  }

  return (
    <div className="register-form-div">
      <form onSubmit={submitHandler}>
        <div className="register-field-div">
          <label className="register-form-label">Username</label>
          <input type="text" name="username"></input>
        </div>
        <div className="register-field-div">
          <label className="register-form-label">Email</label>
          <input type="text" name="email"></input>
        </div>
        <div className="register-field-div">
          <label className="register-form-label">Password</label>
          <input type="password" name="password"></input>
        </div>
        <div className="register-field-div">
          <label className="register-form-label">Re-Password</label>
          <input type="password" name="repeatPassword"></input>
        </div>
        <div className="register-form-button-div">
          <button className="register-form-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
