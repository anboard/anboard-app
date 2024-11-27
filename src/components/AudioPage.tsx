import React from "react";
import AudioList from "./AudioList";
import AudioPlayer from "./AudioPlayer";
import AudioUpload from "./AudioUpload";
import "../styles/audioPage.css";



const AudioPage: React.FC = () => {
  return (
    <div className="audio-page">
      <h1>Audio Section</h1>
      <AudioUpload />
      <AudioList/>
    </div>
  );
};

export default AudioPage;
