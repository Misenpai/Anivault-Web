import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AnimeDetails,
  AnimeStatusData,
  getAnimeDetails,
  readAnimeStatus,
  removeAnimeStatus,
  updateAnimeStatus,
} from "../../../../services/api";
import RevolvingProgressBar from "../../../RevolvingProgressBar";
import "../style/library.css";

interface AnimeStatusDataWithDetails {
  statusData: AnimeStatusData;
  details: AnimeDetails;
}

const Completed: React.FC = () => {
  const [animeList, setAnimeList] = useState<AnimeStatusDataWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const fetchAnimeList = async () => {
    if (!userId) {
      setError("User not logged in");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const statusData = await readAnimeStatus(userId, "Completed"); // Fixed status
      const animeWithDetails: AnimeStatusDataWithDetails[] = [];
      for (const anime of statusData) {
        try {
          const details = await getAnimeDetails(anime.mal_id);
          animeWithDetails.push({ statusData: anime, details });
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Rate limit
        } catch (err) {
          console.error(
            `Error fetching details for anime ${anime.mal_id}:`,
            err
          );
        }
      }
      setAnimeList(animeWithDetails);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load Completed anime"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (mal_id: number) => {
    if (!userId) {
      setError("User not logged in");
      return;
    }
    try {
      await removeAnimeStatus(userId, mal_id);
      fetchAnimeList(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete anime");
    }
  };

  const handleItemClick = (mal_id: number) => {
    // Placeholder: Navigate to anime details page
    alert(`Navigate to anime details for MAL ID: ${mal_id}`);
  };

  useEffect(() => {
    fetchAnimeList();
  }, []);

  return (
    <motion.div
      className="tab-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="tab-title">Completed ({animeList.length})</h2>
      {isLoading && <RevolvingProgressBar />}
      {error && <p className="error-message">{error}</p>}
      <div className="anime-grid">
        {animeList.map((anime) => (
          <motion.div
            key={anime.statusData.mal_id}
            className="anime-card"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <img
              src={anime.details.images.jpg.image_url}
              alt={anime.statusData.anime_name}
              className="anime-image"
              onClick={() => handleItemClick(anime.statusData.mal_id)}
            />
            <h3 className="anime-title">{anime.statusData.anime_name}</h3>
            <div className="anime-details">
              <p>Type: {anime.details.type}</p>
              <p>Season: {anime.details.season}</p>
              <p>Year: {anime.details.year}</p>
            </div>
            <div className="progress-container">
              <progress
                value={anime.statusData.total_watched_episodes}
                max={anime.statusData.total_episodes}
                className="progress-bar"
              />
              <p>
                {anime.statusData.total_watched_episodes} /{" "}
                {anime.statusData.total_episodes} episodes
              </p>
            </div>
            <div className="action-buttons">
              <button
                className="action-button delete-button"
                onClick={() => handleDelete(anime.statusData.mal_id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Completed;
