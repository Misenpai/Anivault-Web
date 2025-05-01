// src/components/layout/NavigationPanel.tsx
import React from "react";
import { NavLink } from "react-router";
import "../../../styles/navigation.css";

interface NavigationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationPanel = ({ isOpen, onClose }: NavigationPanelProps) => {
  return (
    <div className={`navigation-panel ${isOpen ? "open" : ""}`}>
      <div className="nav-header">
        <button className="close-nav" onClick={onClose}>
          X
        </button>
        <h2>Last</h2>
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