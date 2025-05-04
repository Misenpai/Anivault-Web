import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiPlus } from "react-icons/fi";
import {
  AnimeDetails,
  AnimeStatusData,
  getAnimeDetails,
  readAnimeStatus,
  removeAnimeStatus,
  updateAnimeStatus,
} from "../../../../services/api";
import RevolvingProgressBar from "../../../RevolvingProgressBar";
import "../style/tabs.css";

interface AnimeStatusDataWithDetails {
  statusData: AnimeStatusData;
  details: AnimeDetails;
}

const Watching: React.FC = () => {
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
      const statusData = await readAnimeStatus(userId, "Watching");
      const animeWithDetails: AnimeStatusDataWithDetails[] = [];
      for (const anime of statusData) {
        try {
          const details = await getAnimeDetails(anime.mal_id);
          animeWithDetails.push({ statusData: anime, details });
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (err) {
          console.error(
            `Error fetching details for anime ${anime.mal_id}:`,
            err
          );
        }
      }
      setAnimeList(animeWithDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load anime");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEpisodes = async (anime: AnimeStatusDataWithDetails) => {
    if (!userId) {
      setError("User not logged in");
      return;
    }
    try {
      const { total_watched_episodes, total_episodes, mal_id } =
        anime.statusData;
      if (total_watched_episodes >= total_episodes) {
        setError("All episodes watched");
        return;
      }
      const newEpisodes = total_watched_episodes + 1;
      const newStatus =
        newEpisodes === total_episodes ? "Completed" : "Watching";
      await updateAnimeStatus({
        user_id: userId,
        mal_id,
        total_watched_episodes: newEpisodes,
        status: newStatus,
      });
      fetchAnimeList();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update episodes"
      );
    }
  };

  const handleDelete = async (mal_id: number) => {
    if (!userId) {
      setError("User not logged in");
      return;
    }
    try {
      await removeAnimeStatus(userId, mal_id);
      fetchAnimeList();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete anime");
    }
  };

  const handleItemClick = (mal_id: number) => {
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
      <h2 className="tab-title">Watching ({animeList.length})</h2>
      {isLoading && <RevolvingProgressBar />}
      {error && <p className="error-message">{error}</p>}

      <div className="anime-list-container">
        {animeList.map((anime) => (
          <motion.div
            key={anime.statusData.mal_id}
            className="card"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="card__image-container">
              <img
                src={anime.details.images.jpg.image_url}
                alt={anime.statusData.anime_name}
                className="card__image"
                onClick={() => handleItemClick(anime.statusData.mal_id)}
              />
            </div>

            <div className="card__info-container">
              <span
                className="card__title"
                onClick={() => handleItemClick(anime.statusData.mal_id)}
              >
                {anime.statusData.anime_name}
              </span>

              <p className="card__content">
                Type: {anime.details.type} <br />
                Season: {anime.details.season} <br />
                Year: {anime.details.year}
              </p>

              <div className="card__progress">
                <div className="progress-container">
                  <progress
                    value={anime.statusData.total_watched_episodes}
                    max={anime.statusData.total_episodes}
                    className="progress-bar"
                  />
                  <p className="episode-count">
                    {anime.statusData.total_watched_episodes} /{" "}
                    {anime.statusData.total_episodes} ep
                  </p>
                </div>
              </div>

              <div className="card__form">
                <button
                  className="card__button"
                  onClick={() => handleUpdateEpisodes(anime)}
                  disabled={
                    anime.statusData.total_watched_episodes >=
                    anime.statusData.total_episodes
                  }
                >
                  <FiPlus size={20} />
                </button>
                <button
                  className="card__button delete-button"
                  onClick={() => handleDelete(anime.statusData.mal_id)}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Watching;
