import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import header from "../styles/header.module.css";
import layout from "../styles/layout.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import NewsIcon from "@mui/icons-material/Newspaper";
import AccountIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";


const AdminHeader: React.FC<{
  handleMenuClick: () => void;
  admin: { upn: string; email: string };
  pfpLink: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  isMenuOpen?: boolean;
}> = ({ handleMenuClick, admin, setTitle, isMenuOpen }) => {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
admin

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();


  let title = ""

  const toggleMenu = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    event.stopPropagation();
    setMenuOpen((prev) => !prev);
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

  useEffect(() => {
    if (location.pathname.includes("/api/admin/dashboard")) {
      setTitle("Admin Dashboard");
    } else if (location.pathname.includes("/api/admin/announcement")) {
      setTitle("Admin Announcement");
    } else if (location.pathname.includes("/api/admin/news")) {
      setTitle("News");
    } else if (location.pathname.includes("/api/admin/account")) {
      setTitle("Account");
    } else if (location.pathname.includes("/api/admin/mail")) {
      setTitle("Mail");
    }
  }, [location, setTitle]);

  // const handleImageLoad = () => {
  //   setIsLoaded(true);
  // };

  return (
    <header className={`${header.container} ${isMenuOpen ? header.shifted : ""}`}>
      {/* Left Section */}
      <div className={header.left}>
        {/* Hamburger Menu */}
        <div>
          <FontAwesomeIcon icon={faBars}
            className={`${header.icon_wrapper} ${layout.header} ${header.icon_big} ${
              isMenuOpen ? header.menu_hide : ""
            }`}
            onClick={handleMenuClick}
          />
          <div className={`${header.icon_small}`} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars}
              className={`${header.icon_wrapper} ${layout.header} ${
                isMenuOpen ? header.menu_hide : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className={header.dropdown} ref={dropdownRef}>
              <ul>
                <li onClick={() => navigate("/api/admin/dashboard")}>
                  <DashboardIcon className={header.notification} />
                  Dashboard
                </li>
                <li onClick={() => navigate("/api/admin/announcement")}>
                  <AnnouncementIcon className={header.notification} />
                  Announcement
                </li>
                <li onClick={() => navigate("/api/admin/news")}>
                  <NewsIcon className={header.notification} />
                  News
                </li>
                <li onClick={() => navigate("/api/admin/account")}>
                  <AccountIcon className={header.notification} />
                  Account
                </li>
                <li onClick={() => navigate("/api/admin/mail")}>
                  <MailIcon className={header.notification} />
                  Mail
                </li>
                <li onClick={logout}>
                  <LogoutIcon className={header.notification} />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Logo */}
        <img src="/images/logo.png" className={header.logo} alt="Logo" />

        {/* Directory Navigation */}
        <h1
          className={`${header.directory} ${layout.unselectable}`}
          onClick={toggleMenu}
        >
          <span className="directory-code">Admin</span>
          {/* <span className={header.directory_separator}>/</span> */}
          <span className={header.directory_location}>{title}</span>
        </h1>
      </div>

      {/* Right Section */}
      <div className={`${header.right} ${isMenuOpen ? header.right_shifted : ""}`}>
        {/* Search Icon */}
        <SearchIcon className={header.notification} />

        {/* Notifications */}
        <NotificationsIcon className={header.notification} />

      </div>
    </header>
  );
};

export default AdminHeader;
