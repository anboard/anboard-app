import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import header from "../styles/header.module.css";
import { useAuth } from "../AuthContext";
import config from "../config";

const Header: React.FC<
  { handleMenuClick: () => void, broadcaster: { upn: string; email: string }, pfpLink: string }> = ({
    handleMenuClick,
    broadcaster,
    pfpLink
}) => {
  

  const location = useLocation();
  let title = "";
  

  if (location.pathname === "/api/anb-broadcaster/") {
    title = "Dashboard";
  } else if (location.pathname === "/api/anb-broadcaster/profile") {
    title = "Profile";
  } else if (location.pathname === "/api/anb-broadcaster/videos") {
    title = "Videos";
  } else if (location.pathname === "/api/anb-broadcaster/audio") {
    title = "Audio";
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
        <img src={pfpLink} alt="Profile" className={header.profile} />
      </div>
    </header>
  );
};

export default Header;
