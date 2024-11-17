import React from "react";
import styles from "../styles/videcard.module.css";
import config from "../config";

interface VideoCardProps {
  title: string;
  timestamp: string;
  isPlaceholder?: boolean; // If true, render the "New Video" card
  filename: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  timestamp,
  isPlaceholder,
  filename,
}) => {
  if (isPlaceholder) {
    return (
      <div className={`${styles.videoCard} ${styles.placeholderCard}`}>
        <div className={styles.placeholderIcon}>+</div>
        <p>New video</p>
      </div>
    );
  }
    
    const calculateTimeElapsed = (isoDateString: string) => {
      const pastDate = new Date(isoDateString).getTime(); // Get numeric timestamp of the past date
      const currentDate = Date.now();// Get the current date
      const diffInMilliseconds = currentDate - pastDate; // Difference in ms

      // Convert to meaningful units
      const seconds = Math.floor(diffInMilliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Return an object with all units
      if (seconds < 60) {
        return seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago`;
      } else if (minutes < 60) {
        return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
      } else if (hours < 24) {
        return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
      } else {
          return (
              days > 1 ?
                  `${days} days ago`
                  :
                  `${days} day ago`
          );
      }
    };

    
  return (
    <div className={styles.videoCard}>
      {/* <div className={styles.thumbnail}></div> */}
      <video className={styles.thumbnail} controls>
        <source
          src={`${config.API_BASE_URL}/videos/stream?filename=${filename}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className={styles.content}>
        <h3>{title}</h3>
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
