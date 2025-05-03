import React from "react";
import { getNextSeasonInfo } from "../../../../services/seasonUtils";
import useJikanApi from "../../../../services/useJikanApi";
import AnimeCard from "../AnimeCard";
import "../style/animelistsearch.css";

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
}

const TopUpcomingAnime: React.FC = () => {
  const { season, year } = getNextSeasonInfo();
  const { data, loading, error } = useJikanApi<Anime[]>(
    `seasons/${year}/${season}`,
    { page: 1 }
  );

  return (
    <div className="top-airing-anime-container">
      <h2>Top Upcoming Anime</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div className="listContainer">
          {data.map((anime) => (
            <div key={anime.mal_id} className="animeItem">
              <AnimeCard
                anime={{
                  mal_id: anime.mal_id,
                  title: anime.title,
                  imageUrl: anime.images.jpg.image_url,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUpcomingAnime;
