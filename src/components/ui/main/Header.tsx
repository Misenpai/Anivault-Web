import React from "react";
import { useNavigate } from "react-router"; // Fixed import from react-router-dom
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

  // Debug logs
  console.log("Header component rendered");
  console.log("User in header:", user);

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
          <button className="profile-icon" title={user?.name || "User"}>
            {/* Add visible content to button */}
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#8a2be2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          </button>
        </div>
        <button className="logout-button" onClick={handleLogout} title="Logout">
          {/* Add visible text */}
          <span style={{ color: "white" }}>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
