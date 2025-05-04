import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JIKAN_API_BASE_URL from "../config/configjikan";
import "../styles/animedetails.css";
import { AnimeStatusData, saveAnimeStatus } from "../services/api";
import AddingAnimeDatabase from "./AddingAnimeDatabase";
import { motion } from "framer-motion";
import RevolvingProgressBar from "./RevolvingProgressBar";

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
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    } | null;
  };
}

const Notification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="info">
    <div className="info__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        viewBox="0 0 24 24"
        height="24"
        fill="none"
      >
        <path
          fill="#393a37"
          d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718-.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
        ></path>
      </svg>
    </div>
    <div className="info__title">{message}</div>
    <div className="info__close" onClick={onClose}>
      <svg
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
          fill="#393a37"
        ></path>
      </svg>
    </div>
  </div>
);

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleAddClick = () => setShowAddModal(true);
  const handleCloseModal = () => setShowAddModal(false);

  const handleSaveAnime = async (data: AnimeStatusData) => {
    try {
      await saveAnimeStatus(data);
      setNotificationMessage("Anime status saved successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      setNotificationMessage(
        error instanceof Error ? error.message : "Failed to save"
      );
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const res = await fetch(
          `${JIKAN_API_BASE_URL.API_URL}/anime/${id}/full`
        );
        if (!res.ok) throw new Error("Failed to fetch anime details");
        const json = await res.json();
        setAnime(json.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeDetail();
  }, [id]);

  if (loading)
    return (
      <div
        className="loading"
        style={{ display: "flex", justifyContent: "center", padding: 20 }}
      >
        <RevolvingProgressBar />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!anime) return <div>No anime found.</div>;

  return (
    <div className="anime-detail_detail">
      <div className="anime-header_detail">
        <div className="anime-image_detail">
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        </div>
        <div className="info-card_detail">
          <span className="cardtitle_detail">{anime.title}</span>
          <div className="cardcontent_detail">
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
          </div>
        </div>
      </div>

      <div className="details-card_detail">
        <div className="cardcontent_detail">
          <p>
            <strong>English Title:</strong> {anime.title_english || "N/A"}
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

          <div className="section">
            <span className="cardtitle_detail">Openings</span>
            <ul>
              {anime.theme.openings.length > 0 ? (
                anime.theme.openings.map((op, i) => <li key={i}>{op}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div className="section">
            <span className="cardtitle_detail">Endings</span>
            <ul>
              {anime.theme.endings.length > 0 ? (
                anime.theme.endings.map((ed, i) => <li key={i}>{ed}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div className="section">
            <span className="cardtitle_detail">Relations</span>
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

          {anime.trailer.url && (
            <div className="section">
              <span className="cardtitle_detail">Trailer</span>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                title="Anime Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
      <button
        className="add-button_detail archive-button_detail"
        onClick={handleAddClick}
        aria-label="Add to list"
      >
        Add
      </button>
      {showAddModal && (
        <AddingAnimeDatabase
          mal_id={anime.mal_id}
          title={anime.title}
          episodes={anime.episodes}
          status={anime.status}
          onClose={handleCloseModal}
          onSave={handleSaveAnime}
        />
      )}

      {showNotification && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="notification-wrapper"
        >
          <Notification
            message={notificationMessage}
            onClose={() => setShowNotification(false)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default AnimeDetail;
