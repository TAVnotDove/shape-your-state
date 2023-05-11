import React, { useContext } from "react";
import "./Footer.css";
import { ThemeContext } from "../../contexts/themeContext"

const Footer = () => {
  const theme = useContext(ThemeContext)

  return (
    <footer className={`footer-${theme}`}>
      <p>ReactJS 2022</p>
    </footer>
  );
};

export default Footer;
