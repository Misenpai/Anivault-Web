import React, { useState, useEffect } from "react";
import "../style/lastseason.css";
import JIKAN_API_BASE_URL from "../../../../config/configjikan";
import { getPreviousSeasonInfo } from "../../../../services/seasonUtils";

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
      const animeData = data.data.map((item: any) => ({
        id: item.mal_id,
        title: item.title,
        imageUrl: item.images.jpg.image_url,
        genres: item.genres.map((genre: any) => genre.name),
      }));
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="last-season">
      <h2>Last Season</h2>
      <div className="anime-grid">
        {animeList.map((anime) => (
          <div key={anime.id} className="anime-item">
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
