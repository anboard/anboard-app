import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sidebar from "../styles/sidebar.module.css";
import layout from "../styles/layout.module.css";
import header from "../styles/header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import NewsIcon from "@mui/icons-material/Newspaper";
import AccountIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import BroadcastIcon from "@mui/icons-material/BroadcastOnHome";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../AuthContext";

const AdminSidebar: React.FC<{
  handleMenuClick: () => void;
  menuOpen: boolean;
}> = ({ handleMenuClick, menuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/api/admin/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/api/admin/announcement", label: "Announcement", icon: <AnnouncementIcon /> },
    { path: "/api/admin/news", label: "News", icon: <NewsIcon /> },
    { path: "/api/admin/account", label: "Account", icon: <AccountIcon /> },
    { path: "/api/admin/mail", label: "Mail", icon: <MailIcon /> },
    { path: "/api/admin/broadcasters", label: "Broadcasters", icon: <BroadcastIcon /> },
  ];

  return (
    <div className={`${sidebar.container} ${layout.sidebar} ${menuOpen ? sidebar.open : ""}`}>
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
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={isActive(item.path) ? sidebar.active : ""}
            onClick={() => {
              handleMenuClick();
              navigate(item.path);
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
              {item.icon}
              <span>{item.label}</span>
            </div>  
          </li>
        ))}
        <li onClick={logout}>
          <LogoutIcon />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  </div>
  );
};

export default AdminSidebar;
