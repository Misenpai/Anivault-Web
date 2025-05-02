import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import JIKAN_API_BASE_URL from "../../../../config/configjikan";
import "../style/archive.css";

interface SeasonItem {
  year: number;
  seasons: string[];
}

const Archive = () => {
  const [seasons, setSeasons] = useState<SeasonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchSeasons = async () => {
    try {
      await delay(1000); // Rate limit: 1s delay
      const url = `${JIKAN_API_BASE_URL.API_URL}/seasons`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }
      const data = await response.json();
      if (!data.data) {
        throw new Error("No data found in the response.");
      }
      const sortedSeasons = data.data
        .map((item: any) => ({
          year: item.year,
          seasons: item.seasons,
        }))
        .sort((a: SeasonItem, b: SeasonItem) => b.year - a.year);
      setSeasons(sortedSeasons);
      setLoading(false);
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  const handleSeasonClick = (year: number, season: string) => {
    navigate(`/archive/${year}/${season}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}
        <button
          className="retry-button"
          onClick={() => fetchSeasons()}
          aria-label="Retry loading seasons"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="archive">
      <h2>Anime Archive</h2>
      {seasons.length === 0 ? (
        <p className="no-data">No seasons available.</p>
      ) : (
        <div className="season-list">
          {seasons.map((item) => (
            <div key={item.year} className="season-group">
              <h3 className="season-year">{item.year}</h3>
              <div className="season-buttons">
                {["winter", "spring", "summer", "fall"].map((season) => (
                  <button
                    key={season}
                    className={`archive-button season-item season-button ${
                      item.seasons.includes(season) ? "" : "disabled"
                    }`}
                    disabled={!item.seasons.includes(season)}
                    onClick={() => handleSeasonClick(item.year, season)}
                    aria-label={`View ${season} ${item.year} anime`}
                  >
                    {season.charAt(0).toUpperCase() + season.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;
