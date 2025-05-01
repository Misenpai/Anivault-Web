import React, { useState } from "react";
import NavbarHome from "./NavbarHome";
import LastSeason from "./items/LastSeason";

const Home = () => {
  const [activeTab, setActiveTab] = useState("This Season");

  return (
    <div>
      <NavbarHome activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Last" && <LastSeason />}
      {activeTab === "This Season" && <div>This Season Placeholder</div>}
      {activeTab === "Next" && <div>Next Season Placeholder</div>}
      {activeTab === "Archive" && <div>Archive Placeholder</div>}
    </div>
  );
};

export default Home;
