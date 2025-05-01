// src/components/ui/Main.tsx
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router";
import Header from "../ui/main/Header";
import NavigationPanel from "../ui/main/NavigationPanel";
import "../../styles/main.css";

const Main = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="main-container">
      <NavigationPanel isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <div className={`main-content ${isNavOpen ? "with-nav-open" : ""}`}>
        <Header toggleNav={toggleNav} user={user} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
