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
  // faMagnifyingGlass,
  faHouse,
  faRadio,
  faDoorOpen,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../AuthContext";

const Header: React.FC<{
  handleMenuClick: () => void;
  broadcaster: { upn: string; email: string };
  pfpLink: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  isMenuOpen: boolean;
}> = ({ handleMenuClick, broadcaster, pfpLink, setTitle, isMenuOpen }) => {
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

  useEffect(() => {}, [menuOpen]);

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

  useEffect(() => {
    let newTitle = "";
    if (location.pathname === "/api/anb-broadcaster/dashboard") {
      setTitle("Dashboard");
    } else if (location.pathname === "/api/anb-broadcaster/profile") {
      setTitle("Profile");
    } else if (location.pathname === "/api/anb-broadcaster/videos") {
      setTitle("Videos");
    } else if (location.pathname === "/api/anb-broadcaster/videos/upload") {
      setTitle("Videos/upload");
    } else if (location.pathname === "/api/anb-broadcaster/audios") {
      setTitle("Audios");
    } else if (location.pathname === "/api/anb-broadcaster/audios/upload") {
      setTitle("Audios/upload");
    } else if (location.pathname === "/api/anb-broadcaster/station") {
      setTitle("Station");
    }
    setTitle(newTitle);
  }, [location.pathname, setTitle]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <header
      className={`${header.container}  ${isMenuOpen ? header.shifted : ""}`}
    >
      <div className={header.left}>
        {/* <div className={header.icon_wrapper} onClick={handleMenuClick}></div> */}
        <div>
          <FontAwesomeIcon
            icon={faBars}
            className={`${header.icon_wrapper} ${layout.header} ${
              header.icon_big
            } ${isMenuOpen ? header.menu_hide : ""}`}
            onClick={handleMenuClick}
          />
          <div className={`${header.icon_small}`} onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={faBars}
              className={`${header.icon_wrapper} ${layout.header}  ${
                isMenuOpen ? header.menu_hide : ""
              }`}
            />
          </div>
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className={header.dropdown} ref={dropdownRef}>
              <ul>
                <li
                  onClick={() => {
                    navigate("/api/anb-broadcaster/dashboard");
                    setMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={header.notification}
                  />
                  Dashboard
                </li>
                <li
                  onClick={() => {
                    navigate("/api/anb-broadcaster/videos");
                    setMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFileVideo}
                    className={header.notification}
                  />
                  Videos
                </li>
                <li
                  onClick={() => {
                    navigate("/api/anb-broadcaster/audios");
                    setMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFileAudio}
                    className={header.notification}
                  />
                  Audios
                </li>
                <li
                  onClick={() => {
                    navigate("/api/anb-broadcaster/station");
                    setMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRadio}
                    className={header.notification}
                  />
                  Station
                </li>
                <li
                  onClick={() => {
                    navigate("/api/anb-broadcaster/profile");
                    setMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className={header.notification}
                  />
                  Profile
                </li>
                <li onClick={logout}>
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    className={header.notification}
                  />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        <img src="/images/logo.png" className={header.logo} alt="Logo" />
        <h1
          className={`${header.directory} ${layout.unselectable}`}
          onClick={toggleMenu}
        >
          <span className="directory-code">{broadcaster.upn}</span>
          <span className={header.directory_separator}></span>
          <span className={header.directory_location}>{title}</span>
        </h1>
      </div>

      {/* <div className={header.middle}>
        <input type="search" name="header-search" />
      </div> */}

      <div
        className={`${header.right}  ${isMenuOpen ? header.right_shifted : ""} ${layout.clickable}`}
      >
        {/* <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={header.notification}
        /> */}
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
