import React, { useContext } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { UserUpdateContext } from "../../contexts/userContext";
import { ThemeContext, ThemeUpdateContext } from "../../contexts/themeContext"

const Logout = () => {
  const navigate = useNavigate();
  const setState = useContext(UserUpdateContext);
  const theme = useContext(ThemeContext)
  const setTheme = useContext(ThemeUpdateContext)

  function logoutUser(e) {
    if (e.target.textContent === "Yes") {
      localStorage.clear();
      setState(false);

      if (theme !== "dark") {
        setTheme("dark")
      }

      navigate("/", { replace: true });
    }
  }

  return (
    <div className={`logout-div-${theme}`}>
      <div>
        <p className={`logout-text-${theme}`}>Are you sure you want to logout?</p>
        <button onClick={logoutUser} className="logout-button">
          Yes
        </button>
      </div>
    </div>
  );
};

export default Logout;
