import React, { useState, useEffect } from "react";
import "../style/lastseason.css";
import { useNavigate } from "react-router";
import JIKAN_API_BASE_URL from "../../../../config/configjikan";
import { getPreviousSeasonInfo } from "../../../../services/seasonUtils";
import RevolvingProgressBar from "../../../RevolvingProgressBar";

interface Anime {
  id: number;
  title: string;
  imageUrl: string;
  genres: string[];
}

const LastSeason = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchLastSeasonAnime = async (page: number) => {
    try {
      await delay(1000);
      const { season, year } = getPreviousSeasonInfo();
      const url = `${JIKAN_API_BASE_URL.API_URL}/seasons/${year}/${season}?page=${page}`;
      console.log("Requesting URL:", url);
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
      const uniqueAnimeMap = new Map<number, Anime>();
      data.data.forEach((item: { mal_id: number; title: string; images: { jpg: { image_url: string } }; genres: { name: string }[] }) => {
        if (!uniqueAnimeMap.has(item.mal_id)) {
          uniqueAnimeMap.set(item.mal_id, {
            id: item.mal_id,
            title: item.title,
            imageUrl: item.images.jpg.image_url,
            genres: item.genres.map((genre: { name: string }) => genre.name),
          });
        }
      });
      const animeData = Array.from(uniqueAnimeMap.values());
      setAnimeList(animeData);
      setTotalPages(data.pagination.last_visible_page);
      setCurrentPage(page);
      setLoading(false);
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLastSeasonAnime(1);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      fetchLastSeasonAnime(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      fetchLastSeasonAnime(currentPage - 1);
    }
  };

  const handlePageJump = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setLoading(true);
      fetchLastSeasonAnime(page);
    }
  };

  if (loading)
    return (
      <div
        className="loading"
        style={{ display: "flex", justifyContent: "center", padding: 20 }}
      >
        <RevolvingProgressBar />
      </div>
    );
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="last-season">
      <h2>Last Season</h2>
      <div className="anime-grid">
        {animeList.map((anime) => (
          <div
            key={anime.id}
            className="anime-item"
            onClick={() => navigate(`/anime/${anime.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={anime.imageUrl} alt={`${anime.title} poster`} />
            <h3 className="anime-title">{anime.title}</h3>
            <p className="anime-genres">{anime.genres.join(", ")}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => handlePageJump(Number(e.target.value))}
          aria-label="Jump to page"
        />
      </div>
    </div>
  );
};

export default LastSeason;
