import React, { useState, useEffect } from "react";
import "../styles/addinganimedatabase.css";
import { AnimeStatusData } from "../services/api";

interface Props {
  mal_id: number;
  title: string;
  episodes: number;
  status: string;
  onClose: () => void;
  onSave: (data: AnimeStatusData) => void;
}

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
      alert("Please log in to save anime status");
      setIsSaving(false);
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
      alert(
        error instanceof Error
          ? `Failed to save: ${error.message}`
          : "Failed to save"
      );
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
    </div>
  );
};

export default AddingAnimeDatabase;
