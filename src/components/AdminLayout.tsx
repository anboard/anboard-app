import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import "../styles/layout.module.css";

const AdminLayout: React.FC = () => {
  const [broadcaster, setBroadcaster] = useState<{ upn: string; email: string }>({ upn: "", email: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  // const [pfpLink, setPfpLink] = useState<string>(localStorage.getItem("pfpUrl") ?? "");
  const [pfpLink] = useState<string>(localStorage.getItem("pfpUrl") ?? "");

  const handleMenuClick = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    // Fetch broadcaster details if needed
    setBroadcaster({ upn: "123456", email: "admin@example.com" });
  }, []);

  return (
    <div className="layout">
      <Adminheader handleMenuClick={handleMenuClick} broadcaster={broadcaster} pfpLink={pfpLink} />
      {menuOpen && <Adminsidebar handleMenuClick={handleMenuClick} />}
      <main className="main-content">
        <Outlet context={{ broadcaster }} />
      </main>
    </div>
  );
};

export default AdminLayout;
