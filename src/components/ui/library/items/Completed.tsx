import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AnimeDetails,
  AnimeStatusData,
  getAnimeDetails,
  readAnimeStatus,
  removeAnimeStatus,
} from "../../../../services/api";
import RevolvingProgressBar from "../../../RevolvingProgressBar";
import "../style/tabs.css";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const fetchAnimeList = async () => {
    if (!userId) {
      setError("User not logged in");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const statusData = await readAnimeStatus(userId, "Completed");
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
      fetchAnimeList();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete anime");
    }
  };

  const handleItemClick = (mal_id: number) => {
    navigate(`/anime/${mal_id}`);
  };

  useEffect(() => {
    fetchAnimeList();
  }, []);

  return (
    <motion.div
      className="tab-contentLibrary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="tab-titleLibrary">Completed ({animeList.length})</h2>
      {isLoading && <RevolvingProgressBar />}
      {error && <p className="error-messageLibrary">{error}</p>}
      <div className="anime-list-containerLibrary">
        {animeList.map((anime) => (
          <motion.div
            key={anime.statusData.mal_id}
            className="cardLibrary"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="card__image-containerLibrary">
              <img
                src={anime.details.images.jpg.image_url}
                alt={anime.statusData.anime_name}
                className="card__imageLibrary"
                onClick={() => handleItemClick(anime.statusData.mal_id)}
              />
            </div>
            <div className="card__info-containerLibrary">
              <span
                className="card__titleLibrary"
                onClick={() => handleItemClick(anime.statusData.mal_id)}
              >
                {anime.statusData.anime_name}
              </span>
              <p className="card__contentLibrary">
                Type: {anime.details.type} <br />
                Season: {anime.details.season} <br />
                Year: {anime.details.year}
              </p>
              <div className="card__progressLibrary">
                <div className="progress-containerLibrary">
                  <progress
                    value={anime.statusData.total_watched_episodes}
                    max={anime.statusData.total_episodes}
                    className="progress-barLibrary"
                  />
                  <p className="episode-countLibrary">
                    {anime.statusData.total_watched_episodes} /{" "}
                    {anime.statusData.total_episodes} ep
                  </p>
                </div>
              </div>
              <div className="card__formLibrary">
                <button
                  className="card__buttonLibrary delete-buttonLibrary"
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

export default Completed;
