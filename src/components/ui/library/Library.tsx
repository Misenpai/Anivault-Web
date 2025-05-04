import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import NavbarLibrary from "./NavbarLibrary";
import Watching from "./items/Watching";
import Completed from "./items/Completed";
import PlanToWatch from "./items/PlanToWatch";
import Dropped from "./items/Dropped";
import "./style/library.css";

const Library: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Watching");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <motion.div
      className="library-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="library-title">Your Anime Library</h1>
      <NavbarLibrary activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="library-content">
        {activeTab === "Watching" && <Watching />}
        {activeTab === "Completed" && <Completed />}
        {activeTab === "Plan to Watch" && <PlanToWatch />}
        {activeTab === "Dropped" && <Dropped />}
      </div>
    </motion.div>
  );
};

export default Library;
