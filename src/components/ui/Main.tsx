import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import Header from "../ui/main/Header";
import NavigationPanel from "../ui/main/NavigationPanel";
import "../../styles/main.css";

const Main = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : {};

  useEffect(() => {
    console.log("Main component mounted");
    console.log("Current path:", location.pathname);
    console.log("User data in Main:", user);
  }, [location.pathname, user]);

  if (!user || !user.token) {
    console.log("No user token found, redirecting to login");
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
