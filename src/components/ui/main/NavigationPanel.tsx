import React from "react";
import { NavLink } from "react-router";
import "../../../styles/navigation.css";

interface NavigationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationPanel = ({ isOpen, onClose }: NavigationPanelProps) => {
  console.log("NavigationPanel rendered, isOpen:", isOpen);

  return (
    <div className={`navigation-panel ${isOpen ? "open" : ""}`}>
      <div className="nav-header">
        <span className="nav-title">Menu</span>
        <button className="close-nav" onClick={onClose}>
          X
        </button>
      </div>

      <nav className="main-nav">
        <NavLink
          to="/main"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/main/search"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Search
        </NavLink>

        <NavLink
          to="/main/library"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Library
        </NavLink>
      </nav>
    </div>
  );
};

export default NavigationPanel;
