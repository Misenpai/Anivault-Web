import React from "react";
import "../styles/getstarted.css";
import "../styles/commonbackground.css"
import fanart from "../../public/assets/fan_art_removebg.png";
import { useNavigate } from "react-router";

const GetStarted = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="backgound-common-container">
      <img src={fanart} alt="Anivault Fan Art" className="fan-art" />
      <div className="content-box">
        <h1 className="welcome-text">
          Welcome to <span className="anivault-text">Anivault</span>
        </h1>
        <p className="description-text">
          Your ultimate anime companion. Track, discover, and manage your
          favorite anime series all in one place.
        </p>

        <button className="get-started-button" onClick={handleGetStarted}>
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
