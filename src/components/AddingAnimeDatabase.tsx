import React, { useState, useEffect } from "react";
import "../styles/addinganimedatabase.css";
import { AnimeStatusData } from "../services/api";
import { motion } from "framer-motion";

interface Props {
  mal_id: number;
  title: string;
  episodes: number;
  status: string;
  onClose: () => void;
  onSave: (data: AnimeStatusData) => void;
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

const AddingAnimeDatabase: React.FC<Props> = ({
  mal_id,
  title,
  episodes,
  status,
  onClose,
  onSave,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [watchedEpisodes, setWatchedEpisodes] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (status === "Not yet aired") {
      setSelectedStatus("PlantoWatch");
      setWatchedEpisodes(0);
    }
  }, [status]);

  useEffect(() => {
    if (selectedStatus === "Completed") {
      setWatchedEpisodes(episodes);
    } else if (selectedStatus === "PlantoWatch") {
      setWatchedEpisodes(0);
    }
  }, [selectedStatus, episodes]);

  const statusButtons = [
    { label: "Watching", value: "Watching" },
    { label: "Completed", value: "Completed" },
    { label: "Plan to Watch", value: "PlantoWatch" },
    { label: "Dropped", value: "Dropped" },
  ];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.id) {
      setNotificationMessage("Please log in to save anime status");
      setShowNotification(true);
      setIsSaving(false);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    const animeData: AnimeStatusData = {
      user_id: user.id,
      mal_id,
      anime_name: title,
      total_watched_episodes:
        selectedStatus === "Completed" ? episodes : watchedEpisodes,
      total_episodes: episodes,
      status: selectedStatus,
    };

    try {
      await onSave(animeData);
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
      setNotificationMessage(
        error instanceof Error
          ? `Failed to save: ${error.message}`
          : "Failed to save"
      );
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-anime-modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="status-selection">
          {statusButtons.map((btn) => (
            <button
              key={btn.value}
              className={`status-button ${
                selectedStatus === btn.value ? "selected" : ""
              } ${
                status === "Not yet aired" && btn.value !== "PlantoWatch"
                  ? "disabled"
                  : ""
              }`}
              onClick={() => handleStatusChange(btn.value)}
              disabled={
                status === "Not yet aired" && btn.value !== "PlantoWatch"
              }
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="episode-selection">
          <h3>Progress:</h3>
          <div className="episode-scroller">
            {Array.from({ length: episodes + 1 }, (_, i) => i).map((ep) => (
              <div
                key={ep}
                className={`episode-item ${
                  watchedEpisodes === ep ? "selected" : ""
                }`}
                onClick={() => {
                  if (
                    selectedStatus !== "Completed" &&
                    selectedStatus !== "PlantoWatch"
                  ) {
                    setWatchedEpisodes(ep);
                  }
                }}
              >
                {ep}
              </div>
            ))}
          </div>
          <span className="episode-count">
            {watchedEpisodes} / {episodes} episodes
          </span>
        </div>

        <button
          className="save-button"
          onClick={handleSave}
          disabled={!selectedStatus || isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

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

export default AddingAnimeDatabase;
