import React, { useContext, useState } from "react";
import "./Register.css";
import userRegister from "../../services/userServices/userRegister";
import { Link, useNavigate } from "react-router-dom";
import { UserUpdateContext } from "../../contexts/userContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import createSettings from "../../services/settingServices/createSettings";
import { ThemeContext } from "../../contexts/themeContext";

const Register = () => {
  const navigate = useNavigate();
  const setState = useContext(UserUpdateContext);
  const [error, setError] = useState(null);
  const theme = useContext(ThemeContext);

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const repeatPassword = formData.get("repeatPassword").trim();

    let emailRegExp = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/gm;
    let passwordRegExp =
      /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{6,}$/gm;
    let emailIsValid = email.match(emailRegExp);
    let passwordIsValid = password.match(passwordRegExp);

    if (
      username.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      repeatPassword.length !== 0
    ) {
      if (emailIsValid) {
        if (passwordIsValid) {
          if (password === repeatPassword) {
            const data = await userRegister({
              username,
              email,
              password,
            });

            if (data !== undefined) {
              if (!data.code) {
                localStorage.setItem("user", JSON.stringify(data));
                localStorage.setItem("theme", "dark");

                await createSettings(data.accessToken);

                setState(true);

                navigate("/", { replace: true });
              } else {
                setError(`${data.message}.`);
              }
            } else {
              setError("The server failed to connect.");
            }
          } else {
            setError("Password fields don't match.");
          }
        } else {
          setError("Password format isn't valid.");
        }
      } else {
        setError("Email format isn't valid.");
      }
    } else {
      setError("You need to fill in all fields before submitting.");
    }
  }

  return (
    <div className={`register-div-container-${theme}`}>
      {error && <ErrorMessage error={error} />}
      <form onSubmit={submitHandler}>
        <div className="register-field-div">
          <label
            htmlFor="register-username"
            className={`register-form-label-${theme}`}
          >
            Username
          </label>
          <input
            className="register-form-input"
            type="text"
            id="register-username"
            name="username"
          ></input>
        </div>
        <div className="register-field-div">
          <label
            htmlFor="register-email"
            className={`register-form-label-${theme}`}
          >
            Email
          </label>
          <input
            className="register-form-input"
            type="text"
            id="register-email"
            name="email"
            autoComplete="email"
          ></input>
        </div>
        <div className="register-field-div">
          <label
            htmlFor="register-password"
            className={`register-form-label-${theme}`}
          >
            Password
          </label>
          <input
            className="register-form-input"
            type="password"
            id="register-password"
            name="password"
            autoComplete="new-password"
          ></input>
        </div>
        <div className="register-field-div">
          <label
            htmlFor="register-repeat-password"
            className={`register-form-confirm-pass-label-${theme}`}
          >
            Confirm Password
          </label>
          <input
            className="register-form-input"
            type="password"
            id="register-repeat-password"
            name="repeatPassword"
            autoComplete="new-password"
          ></input>
        </div>
        <div className="register-form-button-div">
          <button className="register-form-button">Submit</button>
        </div>
        <p className={`register-form-password-info-${theme}`}>
          Password should:
          <br />
          -be at least 6 characters long;
          <br />
          -have a small letter, capital letter, symbol, number.
        </p>
      </form>
      <div className="register-redirect-div">
        <label className={`register-form-label-${theme}`}>
          Already registered?
        </label>
        <Link className={`register-link-${theme}`} to="/login">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
