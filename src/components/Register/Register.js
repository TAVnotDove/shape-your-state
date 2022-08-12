import React, { useContext, useState } from "react";
import "./Register.css";
import userRegister from "../../services/userRegister";
import { Link, useNavigate } from "react-router-dom";
import { UserUpdateContext } from "../../contexts/userContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Register = () => {
  const navigate = useNavigate();
  const setState = useContext(UserUpdateContext);
  const [error, setError] = useState(null);

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const repeatPassword = formData.get("repeatPassword");

    if (password === repeatPassword) {
      const data = await userRegister(username, email, password);

      if (data !== undefined) {
        if (!data.code) {
          localStorage.setItem("user", JSON.stringify(data));
          setState("user");
          navigate("/", { replace: true });
        }
      } else {
        setError("The server failed to connect.");
      }
    }
  }
  console.log(error);

  return (
    <div className="register-div-container">
      {error && <ErrorMessage error={error} />}
      <form onSubmit={submitHandler}>
        <div className="register-field-div">
          <label htmlFor="register-username" className="register-form-label">
            Username
          </label>
          <input type="text" id="register-username" name="username"></input>
        </div>
        <div className="register-field-div">
          <label htmlFor="register-email" className="register-form-label">
            Email
          </label>
          <input
            type="text"
            id="register-email"
            name="email"
            autoComplete="email"
          ></input>
        </div>
        <div className="register-field-div">
          <label htmlFor="register-password" className="register-form-label">
            Password
          </label>
          <input
            type="password"
            id="register-password"
            name="password"
            autoComplete="new-password"
          ></input>
        </div>
        <div className="register-field-div">
          <label
            htmlFor="register-repeat-password"
            className="register-form-label"
          >
            Re-Password
          </label>
          <input
            type="password"
            id="register-repeat-password"
            name="repeatPassword"
            autoComplete="new-password"
          ></input>
        </div>
        <div className="register-form-button-div">
          <button className="register-form-button">Submit</button>
        </div>
      </form>
      <div className="register-redirect-div">
        <label className="register-form-label">Not registered?</label>
        <Link className="register-link" to="/login">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
