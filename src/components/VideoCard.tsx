import React, { useEffect, useState } from "react";
import styles from "../styles/videcard.module.css";
import config from "../config";
import { useAuth } from "../AuthContext";

interface VideoCardProps {
  title: string;

  description: string;
  timestamp: string;
  isPlaceholder?: boolean; // If true, render the "New Video" card
  filename: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  timestamp,
  isPlaceholder,
  filename,
}) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { accessToken } = useAuth();

  // Fetch video URL on mount
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/video/url?filename=${filename}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video URL");
        }

        const { url } = await response.json();
        setVideoUrl(url);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [filename, accessToken]);

  const calculateTimeElapsed = (isoDateString: string) => {
    const pastDate = new Date(isoDateString).getTime();
    const currentDate = Date.now();
    const diffInMilliseconds = currentDate - pastDate;

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago`;
    } else if (minutes < 60) {
      return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
    } else if (hours < 24) {
      return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
    } else {
      return days > 1 ? `${days} days ago` : `${days} day ago`;
    }
  };

  if (isPlaceholder) {
    return (
      <div className={`${styles.videoCard} ${styles.placeholderCard}`}>
        <div className={styles.placeholderIcon}>+</div>
        <p>New video</p>
      </div>
    );
  }

  return (
    <div className={styles.videoCard}>
      {loading ? (
        <div>Loading video...</div>
      ) : (
        <video className={styles.thumbnail} controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className={styles.content}>
        <h3>{title}</h3>
        <h5>{description}</h5>
        <p>{calculateTimeElapsed(timestamp)}</p>
        <div className={styles.actions}>
          <button>🔗</button>
          <button>↗</button>
          <button>⋮</button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
