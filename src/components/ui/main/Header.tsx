import React from "react";
import { useNavigate } from "react-router";
import { FaBars } from "react-icons/fa";
import "../../../styles/header.css";

interface HeaderProps {
  toggleNav: () => void;
  user: {
    name: string;
    email: string;
  };
}

const Header = ({ toggleNav }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="button menu-toggle" onClick={toggleNav} title="Menu">
          <FaBars size={20} />
        </button>
      </div>

      <div className="header-center">
        <div className="logo-container">
          <h1>ANIVAULT</h1>
        </div>
      </div>

      <div className="header-right">
        <button
          className="button logout-button"
          onClick={handleLogout}
          title="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
