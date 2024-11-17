import React from "react";
import VideoGrid from "./VideoGrid";
import videoList from "../styles/videoList.module.css";
import VideoFilePicker from "./VideoFilePicker";

const NewVideoList: React.FC = () => {

  const handleFilesSelected = (files: FileList | null) => {
    if (files) {
      Array.from(files).forEach((file) => {
        console.log("Selected file:", file.name);
      });
    } else {
      console.log("No files selected");
    }
  };

  return (
    <div className={`${videoList.container}`}>
      <div className={`${videoList.file_comp_head}`}>
        <div className={`${videoList.file_comp_head_text}`}>
          <h2>Videos</h2>
          <p>Upload your video here</p>
        </div>
      </div>

      <div className={`${videoList.file_comp_bottom}`}>
        <VideoFilePicker onFilesSelected={handleFilesSelected} />
      </div>

      <div className={`${videoList.body_text}`}>
        <p className={`${videoList.highlight}`}>Recenct videos</p>
      </div>

      <VideoGrid />
    </div>
  );
};

export default NewVideoList;
