import React, { useContext } from "react";
import "./Register.css";
import userRegister from "../../services/userRegister";
import { useNavigate } from "react-router-dom";
import { UserUpdateContext } from "../../contexts/userContext";

const Register = () => {
  const navigate = useNavigate()
  const setState = useContext(UserUpdateContext)

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const repeatPassword = formData.get("repeatPassword");

    if (password === repeatPassword) {
      const data = await userRegister(username, email, password);

      if (!data.code) {
        localStorage.setItem("user", JSON.stringify(data))
        setState("user")
        navigate("/", {replace: true})
      }
      
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
