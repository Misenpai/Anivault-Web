import React, { useState } from "react";
import NavbarHome from "./NavbarHome";
import LastSeason from "./items/LastSeason";
import ThisSeason from "./items/ThisSeason";
import NextSeason from "./items/NextSeason";
import Archive from "./items/Archive";

const Home = () => {
  const [activeTab, setActiveTab] = useState("This Season");

  return (
    <div>
      <NavbarHome activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Last" && <LastSeason />}
      {activeTab === "This Season" && <ThisSeason />}
      {activeTab === "Next" && <NextSeason />}
      {activeTab === "Archive" && <Archive />}
    </div>
  );
};

export default Home;
