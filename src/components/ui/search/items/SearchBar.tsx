import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../style/searchbar.css";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/main/search/results?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className={`input-container ${isFocused ? "focused" : ""}`}>
        <input
          type="text"
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for anime..."
        />
      </div>
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
