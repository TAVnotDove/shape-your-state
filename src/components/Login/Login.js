import React, { useContext, useRef } from "react";
import "./Login.css";
import userLogin from "../../services/userLogin";
import { useNavigate } from "react-router-dom";
import { UserUpdateContext } from "../../contexts/userContext";

const Login = () => {
  const navigate = useNavigate();
  const setState = useContext(UserUpdateContext);

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (email.length !== 0 && password.length !== 0) {
      const data = await userLogin(email, password);

      if (!data.code) {
        localStorage.setItem("user", JSON.stringify(data));
        setState("user");
        navigate("/", { replace: true });
      }
    }
  }

  const passwordField = useRef();

  function changeHandler(e) {
    if (e.target.checked) {
      passwordField.current.type = "text";
    } else {
      passwordField.current.type = "password";
    }
  }

  return (
    <div className="login-form-div">
      <form onSubmit={submitHandler}>
        <div className="login-field-div">
          <label className="login-form-label">Email</label>
          <input type="text" name="email" autoComplete="email"></input>
        </div>
        <div className="login-field-div">
          <label className="login-form-label">Password</label>
          <input type="password" name="password" ref={passwordField} autoComplete="current-password"></input>
          <input type="checkbox" onChange={changeHandler} />
        </div>
        <div className="login-form-button-div">
          <button className="login-form-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
