import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import JIKAN_API_BASE_URL from "../../../config/configjikan";
import "./style/archiveSelected.css";

interface Anime {
  id: number;
  title: string;
  imageUrl: string;
  genres: string[];
}

interface ApiResponse {
  data: {
    mal_id: number;
    title: string;
    images: { jpg: { image_url: string } };
    genres: { name: string }[];
  }[];
  pagination: {
    has_next_page: boolean;
    last_visible_page: number;
  };
}

const ArchiveSelected: React.FC = () => {
  const { year = "", season = "" } = useParams<{
    year: string;
    season: string;
  }>();
  const navigate = useNavigate();

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const fetchArchivePage = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      await delay(1000);
      const url = `${JIKAN_API_BASE_URL.API_URL}/seasons/${year}/${season}?page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Status ${response.status}: ${text}`);
      }
      const json: ApiResponse = await response.json();

      const map = new Map<number, Anime>();
      json.data.forEach((item) => {
        if (!map.has(item.mal_id)) {
          map.set(item.mal_id, {
            id: item.mal_id,
            title: item.title,
            imageUrl: item.images.jpg.image_url,
            genres: item.genres.map((g) => g.name),
          });
        }
      });

      setAnimeList(Array.from(map.values()));
      setTotalPages(json.pagination.last_visible_page);
      setCurrentPage(page);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivePage(1);
  }, [year, season]);

  const handleNext = () => {
    if (currentPage < totalPages) fetchArchivePage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) fetchArchivePage(currentPage - 1);
  };
  const handleJump = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 1 && val <= totalPages) fetchArchivePage(val);
  };

  if (loading)
    return (
      <div className="loading">
        Loading {season} {year}…
      </div>
    );
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="archive-selected">
      <h2>
        {season.charAt(0).toUpperCase() + season.slice(1)} {year} Anime
      </h2>

      {animeList.length === 0 ? (
        <p className="no-data">No anime found for this season.</p>
      ) : (
        <>
          <div className="anime-grid">
            {animeList.map((anime) => (
              <div
                key={anime.id}
                className="anime-item"
                onClick={() => navigate(`/anime/${anime.id}`)}
                role="button"
                tabIndex={0}
              >
                <img src={anime.imageUrl} alt={anime.title} />
                <h3 className="anime-title">{anime.title}</h3>
                <p className="anime-genres">{anime.genres.join(", ")}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={handleJump}
              aria-label="Jump to page"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ArchiveSelected;
