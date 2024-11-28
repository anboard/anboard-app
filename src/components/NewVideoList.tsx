import React from "react";
import VideoGrid from "./VideoGrid";
import videoList from "../styles/videoList.module.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";


const NewVideoList: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className={`${videoList.container}`}>
      <div className={`${videoList.file_comp_head}`}>
        <div className={`${videoList.file_comp_head_text}`}>
          <h2>Videos</h2>
          <p>Upload your video here</p>
        </div>
      </div>

      <div className={`${videoList.file_comp_bottom}`}>
        <div className={`${videoList.upload_card}`} onClick={() => { navigate('/api/anb-broadcaster/videos/upload') }}>
          <div className={`${videoList.upload_card_icon_wrapper}`}>
            <UploadFileIcon sx={{ fontSize: 16 }} />
          </div>
          <p>
            <span className={`${videoList.highlight}`}>Upload</span> from device
          </p>
            
        </div>
      </div>

      <div className={`${videoList.body_text}`}>
        <p className={`${videoList.highlight}`}>Recent videos</p>
      </div>

      <VideoGrid />
    </div>
  );
};

export default NewVideoList;
