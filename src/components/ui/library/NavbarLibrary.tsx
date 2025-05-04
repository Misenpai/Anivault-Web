import React from "react";
import "./style/navbarlibrary.css";

interface NavbarLibraryProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavbarLibrary: React.FC<NavbarLibraryProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = ["Watching", "Completed", "Plan to Watch", "Dropped"];

  return (
    <div className="nav-wrapper">
      {tabs.map((tab) => (
        <div key={tab} className="nav-option" onClick={() => setActiveTab(tab)}>
          <button className={`nav-btn ${activeTab === tab ? "active" : ""}`}>
            {tab}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NavbarLibrary;
