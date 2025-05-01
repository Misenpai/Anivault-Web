import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <motion.div
      className="main-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: "center", padding: "50px" }}
    >
      <h1>Welcome, {user.name || "Senpai"}!</h1>
      <p>This is the main page of Anivault.</p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#8a2be2",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Home;
