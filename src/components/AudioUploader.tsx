import React, { useState } from "react";
import config from "../config";
import { useAuth } from "../AuthContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import audioUploader from "../styles/uploader.module.css";
import FilePicker from "./FilePicker";
import Previewer from "./Previewer";
import { IAudio } from "../interface/IAudio";

interface LayoutContext {
  setAudios:  React.Dispatch<React.SetStateAction<IAudio[]>>
}

const AudioUploader: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const { setAudios }: LayoutContext = useOutletContext()



  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      setError("Please select a audio file");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("audio", audioFile);

    try {
      const response = await fetch(`${config.API_BASE_URL}/audio/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.status === "success") {
        setError(null);
        setUploading(false);
        setUploaded(true);

        setAudioFile(null);

        console.log(data.audios)
        setAudios(data.audios)
        setTimeout(() => {
          navigate("/api/anb-broadcaster/audios");
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      setError(error.message);
      setUploading(false);
    }
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setAudioFile(file);
      setError(null);
    } else {
    }
  };


  return (
    <div className={`${audioUploader.container}`}>
      {/* <h1>Upload audio</h1> */}
      
      <div className={`${audioUploader.preview_bg}`}>
        {audioFile ? (
          <Previewer file={audioFile} type="audio" />
        ) : (
          <p>No audio selected</p> // This is your default state when no file is uploaded
        )}
      </div>

      <form className={`${audioUploader.form}`}>
        <div className={`${audioUploader.form_group}`}>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className={`${audioUploader.form_group}`}>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <div className={`${audioUploader.form_group}`}>
          <label>Audio File:</label>
          {/* <input
            type="file"
            accept="audio/*"
            onChange={handleaudioFileChange}
          /> */}
          <FilePicker onFilesSelected={handleFilesSelected} type="audio" />
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className={`${audioUploader.submit_button}`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploaded && (
          <p style={{ color: "green" }}>Audio uploaded successfully</p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AudioUploader;
