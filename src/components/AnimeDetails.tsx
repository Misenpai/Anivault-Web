import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JIKAN_API_BASE_URL from "../config/configjikan";

interface Anime {
  mal_id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  score: number;
  rank: number;
  episodes: number;
  status: string;
  type: string;
  source: string;
  synopsis: string;
  rating: string;
  duration: string;
  season: string;
  year: number;
  aired: { string: string };
  genres: { name: string }[];
  producers: { name: string }[];
  licensors: { name: string }[];
  studios: { name: string }[];
  demographics: { name: string }[];
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  theme: {
    openings: string[];
    endings: string[];
  };
  relations: {
    relation: string;
    entry: { name: string }[];
  }[];
}

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await fetch(
          `${JIKAN_API_BASE_URL.API_URL}/anime/${id}/full`
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
    <div>
      <div>
        <figure>
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        </figure>
        <div>
          <h1>{anime.title}</h1>
          <p>
            <strong>English Title:</strong> {anime.title_english || "N/A"}
          </p>
          <p>
            <strong>Japanese Title:</strong> {anime.title_japanese || "N/A"}
          </p>
          <p>
            <strong>Score:</strong> {anime.score || "N/A"}
          </p>
          <p>
            <strong>Rank:</strong> {anime.rank || "N/A"}
          </p>
          <p>
            <strong>Episodes:</strong> {anime.episodes || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {anime.status || "N/A"}
          </p>
          <p>
            <strong>Type:</strong> {anime.type || "N/A"}
          </p>
          <p>
            <strong>Source:</strong> {anime.source || "N/A"}
          </p>
          <p>
            <strong>Aired:</strong> {anime.aired?.string || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> {anime.rating || "N/A"}
          </p>
          <p>
            <strong>Duration:</strong> {anime.duration || "N/A"}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {anime.genres.map((g) => g.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Producers:</strong>{" "}
            {anime.producers.map((p) => p.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Licensors:</strong>{" "}
            {anime.licensors.map((l) => l.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Studios:</strong>{" "}
            {anime.studios.map((s) => s.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Demographics:</strong>{" "}
            {anime.demographics.map((d) => d.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Season:</strong> {anime.season || "N/A"}
          </p>
          <p>
            <strong>Year:</strong> {anime.year || "N/A"}
          </p>
          <p>
            <strong>Synopsis:</strong> {anime.synopsis || "N/A"}
          </p>

          <div>
            <h3>Openings</h3>
            <ul>
              {anime.theme.openings.length > 0 ? (
                anime.theme.openings.map((op, i) => <li key={i}>{op}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div>
            <h3>Endings</h3>
            <ul>
              {anime.theme.endings.length > 0 ? (
                anime.theme.endings.map((ed, i) => <li key={i}>{ed}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div>
            <h3>Relations</h3>
            {anime.relations.length > 0 ? (
              anime.relations.map((rel, i) => (
                <p key={i}>
                  <strong>{rel.relation}:</strong>{" "}
                  {rel.entry.map((e) => e.name).join(", ")}
                </p>
              ))
            ) : (
              <p>N/A</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
