import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JIKAN_API_BASE_URL from "../config/configjikan";

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await fetch(
          `${JIKAN_API_BASE_URL.API_URL}/anime/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const data = await response.json();
        setAnime(data.data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!anime) return <div>No anime found.</div>;

  return (
    <div className="anime-detail">
      <h1>{anime.title}</h1>
      <img src={anime.images.jpg.image_url} alt={anime.title} />
      <p>{anime.synopsis}</p>
      <p>
        <strong>Genres:</strong>{" "}
        {anime.genres.map((g: any) => g.name).join(", ")}
      </p>
      <p>
        <strong>Episodes:</strong> {anime.episodes}
      </p>
      <p>
        <strong>Status:</strong> {anime.status}
      </p>
      <p>
        <strong>Aired:</strong> {anime.aired.string}
      </p>
    </div>
  );
};

export default AnimeDetail;
