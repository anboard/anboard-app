import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import layout from "../styles/layout.module.css";
// import AdminMail from './AdminMail';
const AdminLayout: React.FC = () => {
  const [broadcaster, setBroadcaster] = useState<{ upn: string; email: string }>({ upn: "", email: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [pfpLink, setPfpLink] = useState<string>(localStorage.getItem("pfpUrl") ?? "");
  setPfpLink

  const handleMenuClick = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    // Fetch broadcaster details if needed
    setBroadcaster({ upn: "123456", email: "admin@example.com" });
  }, []);

  return (
    <div className={layout.layout}>
      <Adminheader handleMenuClick={handleMenuClick} broadcaster={broadcaster} pfpLink={pfpLink} />
      {menuOpen && <Adminsidebar handleMenuClick={handleMenuClick} />}
      <main className={`${layout.main_content} ${menuOpen ? layout.shifted : ''}`}>
      <h1 style={{ color: "black" }}>AdminMail</h1>
        <Outlet context={{ broadcaster }} />
      </main>
    </div>
  );
};

export default AdminLayout;
