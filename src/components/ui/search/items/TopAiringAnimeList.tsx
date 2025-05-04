import React, { useMemo } from "react";
import useJikanApi from "../../../../services/useJikanApi";
import AnimeCard from "../AnimeCard";
import "../style/animelistsearch.css";
import RevolvingProgressBar from "../../../RevolvingProgressBar";

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
}

const TopAiringAnime: React.FC = () => {
  const { data, loading, error } = useJikanApi<Anime[]>("top/anime", {
    filter: "airing",
    page: 1,
  });

  const uniqueAnimeList = useMemo(() => {
    const uniqueMap = new Map<number, Anime>();
    data?.forEach((anime) => {
      if (!uniqueMap.has(anime.mal_id)) {
        uniqueMap.set(anime.mal_id, anime);
      }
    });
    return Array.from(uniqueMap.values());
  }, [data]);

  return (
    <div className="top-airing-anime-container">
      <h2>Top Airing Anime</h2>
      {loading && (
        <div
          className="loading"
          style={{ display: "flex", justifyContent: "center", padding: 16 }}
        >
          <RevolvingProgressBar />
        </div>
      )}
      {error && <p>{error}</p>}
      {uniqueAnimeList && (
        <div className="listContainer">
          {uniqueAnimeList.map((anime) => (
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

export default TopAiringAnime;
