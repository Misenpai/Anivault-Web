import React from "react";
import "../styles/getstarted.css";
import fanart from "../../public/assets/fan_art_removebg.png";
import { useNavigate } from "react-router"; // Fixed import to react-router-dom
import { motion } from "framer-motion";

const GetStarted = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <motion.div
      className="get-started-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        x: "-100vw",
        transition: { duration: 0.5 },
      }}
    >
      <motion.img
        src={fanart}
        alt="Anivault Fan Art"
        className="fan-art"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        exit={{
          x: "-100vw",
          transition: { duration: 0.3 },
        }}
      />
      <motion.div
        className="content-box"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        exit={{
          x: "-100vw",
          transition: { duration: 0.3, delay: 0.1 },
        }}
      >
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
      </motion.div>
    </motion.div>
  );
};

export default GetStarted;