import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import config from "../config";
import { useOutletContext } from "react-router-dom";
import { AudioContext } from "../interface/IAudio";
import "../styles/audioUpload.css";

const AudioUpload: React.FC = () => {
  const { setAudioList } = useOutletContext<AudioContext>();
  const { accessToken } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an audio file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("audio", file);

    try {
      const response = await fetch(`${config.API_BASE_URL}/audio/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        throw new Error("Failed to upload audio");
      }

      const newaudio = await response.json();
      setAudioList((prev) => [...prev, newaudio]);

      setTitle("");
      setDescription("");
      setFile(null);
      setError(""); // Clear error on success
    } catch (err: any) {
      setError(err.message || "Failed to upload audio");
    }
  };

  return (
    <div className="audio-upload">
      <h2>Upload Audio</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AudioUpload;
