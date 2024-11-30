import React from "react";
import AudioList from "./AudioList";
import AudioUpload from "./AudioUploader";
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
