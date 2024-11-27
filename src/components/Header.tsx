import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import header from "../styles/header.module.css";

const Header: React.FC<{
  handleMenuClick: () => void;
  broadcaster: { upn: string; email: string };
  pfpLink: string;
}> = ({ handleMenuClick, broadcaster, pfpLink }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let title = "";

  if (location.pathname === "/api/anb-broadcaster/dashboard") {
    title = "dashboard";
  } else if (location.pathname === "/api/anb-broadcaster/profile") {
    title = "profile";
  } else if (location.pathname === "/api/anb-broadcaster/videos") {
    title = "videos";
  } else if (location.pathname === "/api/anb-broadcaster/videos/upload") {
    title = "video_upload";
  } else if (location.pathname === "/api/anb-broadcaster/audios") {
    title = "audio";
  } else if (location.pathname === "/api/anb-broadcaster/station") {
    title = "station";
  }

  return (
    <header className={header.container}>
      <div className={header.left}>
        <div className={header.icon_wrapper} onClick={handleMenuClick}>
          <MenuIcon sx={{ fontSize: 36 }} className={header.notification} />
        </div>
        <img src="/images/logo.png" className={header.logo} alt="Logo" />
        <h1 className={header.directory}>
          <span className="directory-code">{broadcaster.upn}</span>
          <span className={header.directory_separator}>/</span>
          <span className={header.directory_location}>{title}</span>
        </h1>
      </div>

      {/* <div className={header.middle}>
        <input type="search" name="header-search" />
      </div> */}

      <div className={header.right}>
        {/* notification icon */}
        <SearchIcon sx={{ fontSize: 36 }} className={header.notification} />
        <NotificationsNoneIcon
          sx={{ fontSize: 36 }}
          className={header.notification}
        />
        {/* profile icon */}
        <img
          src={pfpLink}
          alt="Profile"
          className={header.profile}
          onClick={() => navigate("/api/anb-broadcaster/profile")}
        />
      </div>
    </header>
  );
};

export default Header;
