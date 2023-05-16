import React, { useContext } from "react";
import "./Home.css";
import { ThemeContext } from "../../contexts/themeContext"

const Home = () => {
  const theme = useContext(ThemeContext)

  return (
    <div className={`home-div-${theme}`}>
      <h1 className={`home-title-${theme}`}>Welcome to Shape your State!</h1>
      <p className={`home-text-${theme}`}>
        This is a website where you can share the progress made and future goals
        you have on your journey of bettering your physical and mental states.
      </p>
    </div>
  );
};

export default Home;
