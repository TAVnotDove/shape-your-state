import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import "./Header.css";
import { ThemeContext } from "../../contexts/themeContext"

const Header = () => {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext)

  return (
    <nav className={`navbar-${theme}`}>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      {user === null ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/post/create">Create post</Link>
          <Link to="/logout">Logout</Link>
        </>
      )}
    </nav>
  );
};

export default Header;
