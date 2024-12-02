import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import header from "../styles/header.module.css";
import layout from "../styles/layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faFileAudio,
  faFileVideo,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faHouse,
  faRadio,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../AuthContext";

const Header: React.FC<{
  handleMenuClick: () => void;
  broadcaster: { upn: string; email: string };
  pfpLink: string;
}> = ({  broadcaster, pfpLink }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  
  let title = "";

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent the event from bubbling to document
    setMenuOpen((prev) => !prev); // Toggle menu state
  };

  useEffect(() => {
    console.log("menuOpen state changed:", menuOpen);
  }, [menuOpen]);

  const handleOutsideClick = (event: MouseEvent) => {
    event.stopPropagation();
    // Ensure that the ref is typed and that 'current' exists
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    // Add event listener when the menu is open
    if (menuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    // Cleanup event listener on component unmount or menu close
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  if (location.pathname === "/api/anb-broadcaster/dashboard") {
    title = "dashboard";
  } else if (location.pathname === "/api/anb-broadcaster/profile") {
    title = "profile";
  } else if (location.pathname === "/api/anb-broadcaster/videos") {
    title = "videos";
  } else if (location.pathname === "/api/anb-broadcaster/videos/upload") {
    title = "videos/upload";
  } else if (location.pathname === "/api/anb-broadcaster/audios") {
    title = "audios";
  } else if (location.pathname === "/api/anb-broadcaster/audios/upload") {
    title = "audios/upload";
  } else if (location.pathname === "/api/anb-broadcaster/station") {
    title = "station";
  }

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <header className={header.container}>
      <div className={header.left}>
        {/* <div className={header.icon_wrapper} onClick={handleMenuClick}></div> */}
        <img src="/images/logo.png" className={header.logo} alt="Logo" />
        <h1
          className={`${header.directory} ${layout.unselectable}`}
          onClick={toggleMenu}
        >
          <span className="directory-code">{broadcaster.upn}</span>
          <span className={header.directory_separator}>/</span>
          <span className={header.directory_location}>{title}</span>
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className={header.dropdown} ref={dropdownRef}>
              <ul>
                <li onClick={() => navigate("/api/anb-broadcaster/dashboard")}>
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={header.notification}
                  />
                  Dashboard
                </li>
                <li onClick={() => navigate("/api/anb-broadcaster/videos")}>
            <FontAwesomeIcon icon={faFileVideo} className={header.notification} />

                  Videos
                </li>
                <li onClick={() => navigate("/api/anb-broadcaster/audios")}>
        <FontAwesomeIcon icon={faFileAudio} className={header.notification} />

                  Audios
                </li>
                <li onClick={() => navigate("/api/anb-broadcaster/station")}>
        <FontAwesomeIcon icon={faRadio} className={header.notification} />
                  
                  Station
                </li>
                <li onClick={() => navigate("/api/anb-broadcaster/profile")}>
        <FontAwesomeIcon icon={faUser} className={header.notification} />

                  Profile
                </li>
                <li onClick={logout}>
        <FontAwesomeIcon icon={faDoorOpen} className={header.notification} />
                  
                  Logout
                  </li>
              </ul>
            </div>
          )}
        </h1>
      </div>

      {/* <div className={header.middle}>
        <input type="search" name="header-search" />
      </div> */}

      <div className={header.right}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={header.notification}
        />
        <FontAwesomeIcon icon={faBell} className={header.notification} />

        {!isLoaded && (
          <img
            // src={pfpLink}
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${broadcaster.email}&radius=50&backgroundType=gradientLinear`}
            alt="Profile"
            className={header.profile}
            onClick={() => navigate("/api/anb-broadcaster/profile")}
          />
        )}
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

export default Header;
