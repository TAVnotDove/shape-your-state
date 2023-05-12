import React, { useContext, useState } from "react";
import "./Login.css";
import userLogin from "../../services/userServices/userLogin";
import { Link, useNavigate } from "react-router-dom";
import { UserUpdateContext } from "../../contexts/userContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ThemeContext } from "../../contexts/themeContext"

const Login = () => {
  const navigate = useNavigate();
  const setState = useContext(UserUpdateContext);
  const [error, setError] = useState(null);
  const theme = useContext(ThemeContext)

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (email.length !== 0 && password.length !== 0) {
      const data = await userLogin(email, password);

      if (data !== undefined) {
        if (!data.code && data !== undefined) {
          localStorage.setItem("user", JSON.stringify(data));
          setState(true);
          navigate("/", { replace: true });
        } else {
          setError(`${data.message}.`);
        }
      } else {
        setError("The server failed to connect.");
      }
    } else {
      setError("You need to fill in both fields before submitting.");
    }
  }

  return (
    <div className={`login-div-container-${theme}`}>
      {error && <ErrorMessage error={error} />}
      <form onSubmit={submitHandler}>
        <div className="login-field-div">
          <label htmlFor="login-email" className={`login-form-label-${theme}`}>
            Email
          </label>
          <input
            className="login-form-input"
            type="text"
            id="login-email"
            name="email"
            autoComplete="email"
          ></input>
        </div>
        <div className="login-field-div">
          <label htmlFor="login-password" className={`login-form-label-${theme}`}>
            Password
          </label>
          <input
            className="login-form-input"
            type="password"
            id="login-password"
            name="password"
            autoComplete="current-password"
          ></input>
        </div>
        <div className="login-form-button-div">
          <button className="login-form-button">Submit</button>
        </div>
      </form>
      <div className="login-redirect-div">
        <label className={`login-form-label-${theme}`}>Not registered?</label>
        <Link className={`login-link-${theme}`} to="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
