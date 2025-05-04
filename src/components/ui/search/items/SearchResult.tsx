import { useLocation } from "react-router";
import { motion } from "framer-motion";
import useJikanApi from "../../../../services/useJikanApi";
import "../style/searchResult.css";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  type: string;
  season: string;
  year: number;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  // Call the hook unconditionally at the top
  const { data, loading, error } = useJikanApi<Anime[]>(
    "anime",
    query ? { q: query } : {}
  );

  // Handle empty or null query
  if (!query || query.trim() === "") {
    return <div className="error-message">No search query provided.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <motion.div
      className="results-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="results-title">Search Results for: {query}</h2>
      <div className="anime-list-container">
        {data && data.length > 0 ? (
          data.map((anime) => (
            <motion.div
              key={anime.mal_id}
              className="card"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="card__image-container">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="card__image"
                  onClick={() =>
                    alert(
                      `Navigate to anime details for MAL ID: ${anime.mal_id}`
                    )
                  }
                />
              </div>
              <div className="card__info-container">
                <span
                  className="card__title"
                  onClick={() =>
                    alert(
                      `Navigate to anime details for MAL ID: ${anime.mal_id}`
                    )
                  }
                >
                  {anime.title}
                </span>
                <p className="card__content">
                  Type: {anime.type || "Unknown"} <br />
                  Season: {anime.season || "Unknown"} <br />
                  Year: {anime.year || "Unknown"}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="error-message">No results found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default SearchResults;
