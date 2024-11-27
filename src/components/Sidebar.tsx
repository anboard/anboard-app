import React from "react";
import sidebar from "../styles/sidebar.module.css";
import header from "../styles/header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AlbumIcon from "@mui/icons-material/Album";
import RadioIcon from "@mui/icons-material/Radio";
import { useAuth } from "../AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC<{
  handleMenuClick: () => void;
}> = ({ handleMenuClick }) => {
  const navigation = useNavigate();
  const { logout } = useAuth();

  return (
    <div className={sidebar.container}>
      <div className={sidebar.flex_wrapper}>
        <div className={`${header.left} ${sidebar.top}`}>
          <img src="/images/logo.png" className={header.logo} alt="Logo" />
          <div className={header.icon_wrapper} onClick={handleMenuClick}>
            <CloseIcon
              sx={{ fontSize: 36 }}
              className={`${header.notification} ${sidebar.close}`}
            />
          </div>
        </div>

        <ul className={sidebar.nav}>
          <li
            onClick={() => {
              handleMenuClick();
              navigation("/api/anb-broadcaster/dashboard");
            }}
          >
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <DashboardIcon />
              <span>Dashboard</span>
            </div>
          </li>
          <li
            onClick={() => {
              handleMenuClick();
              navigation("/api/anb-broadcaster/videos");
            }}
          >
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <VideoLibraryIcon />
              <span>Videos</span>
            </div>
          </li>
          <li>
          <div 
              onClick={() => {
                handleMenuClick();
                window.location.href = "/api/anb-broadcaster/audios";
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
            <AlbumIcon />
            <span>Audio</span>
            </div>
          </li>
          <li
            onClick={() => {
              handleMenuClick();
              navigation(`/api/anb-broadcaster/station`);
            }}
          >
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <RadioIcon />
              <span>Station</span>
            </div>
          </li>
          <li
            onClick={() => {
              logout();
            }}
          >
            <LogoutIcon />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
