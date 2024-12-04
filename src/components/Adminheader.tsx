import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import header from "../styles/header.module.css";

const Adminheader: React.FC<{
  handleMenuClick: () => void;
  broadcaster: { upn: string; email: string };
  pfpLink: string;
}> = ({ handleMenuClick, broadcaster, pfpLink }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const navigate = useNavigate();
  const location = useLocation();
  let title = "";

  if (location.pathname === "/api/admin/dashboard") {
    title = "dashboard";
  } else if (location.pathname === "/api/anb-broadcaster/profile") {
    title = "profile";
  } else if (location.pathname === "/api/admin/announcement") {
    title = "announcement";
  } else if (location.pathname === "/api/admin/news") {
    title = "news";
  } else if (location.pathname === "/api/admin/account") {
    title = "account";
  }else if (location.pathname === "/api/admin/mail") {
    title = "mail";
  }

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <header className={header.container}>
      <div className={header.left}>
        <div className={header.icon_wrapper} onClick={handleMenuClick}>
          <MenuIcon sx={{ fontSize: 36 }} className={header.notification} />
        </div>
        <img src="/images/logo.png" className={header.logo} alt="Logo" />
        <h1 className={header.directory}>
          <span className="directory-code">Admin</span>
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
       { !isLoaded && <img
          // src={pfpLink}
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${broadcaster.email}&radius=50&backgroundType=gradientLinear`}
          alt="Profile"
          className={header.profile}
          onClick={() => navigate("/api/anb-broadcaster/profile")}
        />}
         <img
          src={pfpLink}
          onLoad={handleImageLoad}
          alt="Profile"
          className={header.profile}
          onClick={() => navigate("/api/anb-broadcaster/profile")}
          style={{ display: isLoaded ? "block" : "none" }}
        />
      </div>
    </header>
  );
};

export default Adminheader;
