import React from "react";
import { useNavigate } from "react-router";
import "./style/animecard.css";

interface AnimeCardProps {
  anime: {
    mal_id: number;
    title: string;
    imageUrl: string;
  };
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const navigate = useNavigate();

  return (
    <div
      className="anime-card"
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
    >
      <img
        src={anime.imageUrl}
        alt={`${anime.title} poster`}
        className="anime-image"
      />
      <h3 className="anime-title">{anime.title}</h3>
    </div>
  );
};

export default AnimeCard;
