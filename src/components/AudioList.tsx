// import "../styles/audioList.css";
// import React, { useState, useEffect } from "react";
// import { useOutletContext } from 'react-router-dom'
// import config from "../config";
// import { useAuth } from "../AuthContext";
// import { AudioContext } from "../interface/IAudio";



// const AudioList: React.FC = () => {
//   const { audioList, setAudioList } = useOutletContext<AudioContext>();
//   const { accessToken } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const fetchAudios = async () => {
//       try {
//         const response = await fetch(`${config.API_BASE_URL}/audios`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         if (!response.ok) {
//           const error = await response.json();
//           setError(error.error || "Failed to fetch audio list");
//           return;
//         }

//         const data = await response.json();
//         setAudioList(data.audios);
//       } catch (err: any) {
//         setError(err.message || "Failed to fetch audios");
//       }finally{
//         setLoading(false);
//       }

//     };

//     fetchAudios();
//   }, [accessToken, setAudioList]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;


//   const handleDelete = async (id: string) => {
//     try {
//       const response = await fetch(`${config.API_BASE_URL}/audio/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         setError(error.message);
//         return;
//       }

//       setAudioList((prev) => prev.filter((audio) => audio.id !== id));
//     } catch (err: any) {
//       setError(err.message || "Failed to delete audio");
//     }
//   };
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <div className="audio-list">
//       <h2>Audio Files</h2>
//       {error && <p className="error">{error}</p>}
//       {audioList && audioList.length > 0 ? (
//       audioList.map((audio, index) => (
//         <div key={audio.id || index} className="audio-item">
//           <h3>{audio.title}</h3>
//           <p>{audio.description}</p>
//           <audio controls src={audio.url}></audio>
//           <button onClick={() => handleDelete(audio.id)}>Delete</button>
//         </div>
//       ))
//     ) : (
//       <p>No audio files uploaded yet.</p>
//     )}
//     </div>
//   );
// };

// export default AudioList;


import React from "react";
import AudioGrid from "./AudioGrid";
import videoList from "../styles/videoList.module.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";


const VideoList: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className={`${videoList.container}`}>
      <div className={`${videoList.file_comp_head}`}>
        <div className={`${videoList.file_comp_head_text}`}>
          <h2>Audios</h2>
          <p>Upload your audio here</p>
        </div>
      </div>

      <div className={`${videoList.file_comp_bottom}`}>
        <div className={`${videoList.upload_card}`} onClick={() => { navigate('/api/anb-broadcaster/audios/upload') }}>
          <div className={`${videoList.upload_card_icon_wrapper}`}>
            <UploadFileIcon sx={{ fontSize: 16 }} />
          </div>
          <p>
            <span className={`${videoList.highlight}`}>Upload</span> from device
          </p>
            
        </div>
      </div>

      <div className={`${videoList.body_text}`}>
        <p className={`${videoList.highlight}`}>Recent audios</p>
      </div>

      <AudioGrid />
    </div>
  );
};

export default VideoList;
