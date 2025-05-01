// src/components/layout/Header.tsx
import React from "react";
import { useNavigate } from "react-router";
import "../../../styles/header.css";

interface HeaderProps {
  toggleNav: () => void;
  user: {
    name: string;
    email: string;
  };
}

const Header = ({ toggleNav, user }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleNav}>
          <span className="menu-icon">☰</span>
        </button>
      </div>

      <div className="header-center">
        <div className="logo-container">
          <h1 className="logo-text">ANIVAULT</h1>
        </div>
      </div>

      <div className="header-right">
        <div className="profile-button">
          <button className="profile-icon" title={user.name}>
          </button>
        </div>
        <button className="logout-button" onClick={handleLogout} title="Logout">
        </button>
      </div>
    </header>
  );
};

export default Header;
