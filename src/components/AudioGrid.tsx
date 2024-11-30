import React from "react";
import AudioCard from "./AudioCard";
import styles from "../styles/videogrid.module.css";
import { IAudio } from "../interface/IAudio";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  //   userData: { name: string; email: string } | null;
  audios: IAudio[];
  setAudios:  React.Dispatch<React.SetStateAction<IAudio[]>>
}

const AudioGrid: React.FC = () => {
  const { audios }: LayoutContext = useOutletContext();
  

  return (
    <div className={styles.videoGrid}>
      {/* <AudioCard isPlaceholder={true} title="" timestamp="" filename="" /> */}
      {audios && audios.map((audio) => (
        <AudioCard
          key={audio.audio_name}
          title={audio.title}
          description={audio.description ? audio.description : ''}
          timestamp={audio.upload_date?.toString() as string}
          filename={audio.file_name}
          mimetype={audio.mime_type}
        />
      ))}
    </div>
  );
};

export default AudioGrid;
