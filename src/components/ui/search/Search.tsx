import React, { useEffect } from "react";
import SearchBar from "./items/SearchBar";
import TopAiringAnime from "./items/TopAiringAnimeList";
import TopAnime from "./items/TopAnimeList";
import RecommendedAnime from "./items/RecommendedAnimeList";
import TopUpcomingAnime from "./items/TopUpcommingAnime";
import "./style/search.css";

const Search: React.FC = () => {
  useEffect(() => {
    console.log("Search component mounted");
  }, []);

  return (
    <div className="search-container">
      <SearchBar />
      <TopAiringAnime />
      <TopAnime />
      <RecommendedAnime />
      <TopUpcomingAnime />
    </div>
  );
};

export default Search;
