import React from "react";
import "./style/navbarhome.css";

interface NavbarHomeProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavbarHome: React.FC<NavbarHomeProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="nav-wrapper">
      <div className="nav-option" onClick={() => setActiveTab("Last")}>
        <button className={`nav-btn ${activeTab === "Last" ? "active" : ""}`}>
          Last
        </button>
      </div>
      <div className="nav-option" onClick={() => setActiveTab("This Season")}>
        <button
          className={`nav-btn ${activeTab === "This Season" ? "active" : ""}`}
        >
          This Season
        </button>
      </div>
      <div className="nav-option" onClick={() => setActiveTab("Next")}>
        <button className={`nav-btn ${activeTab === "Next" ? "active" : ""}`}>
          Next
        </button>
      </div>
      <div className="nav-option" onClick={() => setActiveTab("Archive")}>
        <button
          className={`nav-btn ${activeTab === "Archive" ? "active" : ""}`}
        >
          Archive
        </button>
      </div>
    </div>
  );
};

export default NavbarHome;
