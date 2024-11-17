import React from "react";
import VideoCard from "./VideoCard";
import styles from "../styles/videogrid.module.css";
import Ivideo from "../interface/IVideo";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  //   userData: { name: string; email: string } | null;
  videos: Ivideo[];
}

const VideoGrid: React.FC = () => {
  const { videos }: LayoutContext = useOutletContext();
  

  return (
    <div className={styles.videoGrid}>
      {/* <VideoCard isPlaceholder={true} title="" timestamp="" filename="" /> */}
      {videos.map((video) => (
        <VideoCard
          key={video.filename}
          title={video.title}
          timestamp={video.upload_date?.toString() as string}
              filename={video.filename}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
