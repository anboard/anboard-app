import React from "react";
import sidebar from "../styles/sidebar.module.css";
import header from "../styles/header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AlbumIcon from "@mui/icons-material/Album";
import RadioIcon from "@mui/icons-material/Radio";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC<{
  handleMenuClick: () => void;
  broadcaster: { upn: string; email: string };
  // title: string;
}> = ({ handleMenuClick, broadcaster }) => {
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
          <li onClick={handleMenuClick}>
            <NavLink to="/api/anb-broadcaster/">
              <DashboardIcon />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li onClick={handleMenuClick}>
            <NavLink to="/api/anb-broadcaster/videos">
              <VideoLibraryIcon />
              <span>Video</span>
            </NavLink>
          </li>
          <li>
            <AlbumIcon />
            <span>Audio</span>
          </li>
          <li>
            <RadioIcon />
            <span>Station</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
