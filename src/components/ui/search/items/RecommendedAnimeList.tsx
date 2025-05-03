import React from "react";
import useJikanApi from "../../../../services/useJikanApi";
import AnimeCard from "../AnimeCard";
import "../style/animelistsearch.css";

interface Recommendation {
  entry: {
    mal_id: number;
    title: string;
    images: { jpg: { image_url: string } };
  }[];
}

const RecommendedAnime: React.FC = () => {
  const { data, loading, error } = useJikanApi<Recommendation[]>(
    "recommendations/anime",
    { page: 1 }
  );

  return (
    <div className="top-airing-anime-container">
      <h2>Recommended Anime</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div className="listContainer">
          {data
            .flatMap((rec) => rec.entry)
            .map((anime) => (
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

export default RecommendedAnime;
