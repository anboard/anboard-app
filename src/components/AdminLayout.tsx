import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "./Adminheader";
import AdminSidebar from "./Adminsidebar";
import layout from "../styles/layout.module.css";

const AdminLayout: React.FC = () => {
  const [admin, setAdmin] = useState<{ upn: string; email: string }>({
    upn: "",
    email: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [pfpLink, setPfpLink] = useState<string>(
    localStorage.getItem("pfpUrl") ?? ""
  );
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("Dashboard");
  title

  const [loading, setLoading] = useState(true);

  // Use React Router's `useLocation` to track the current route
  const location = useLocation();

  // Dynamically update the page and tab title based on the current route
  useEffect(() => {
    const getPageTitle = (): string => {
      switch (location.pathname) {
        case "/api/admin/announcement":
          return "Announcement";
        case "/api/admin/dashboard":
          return "Dashboard";
        case "/api/admin/settings":
          return "Settings";
        case "/api/admin/account":
          return "Account";
        case "/api/admin/news":
          return "News";
        case "/api/admin/mail":
          return "Mail";
        case "/api/admin/broadcasters":
          return "Broadcasters";
        default:
          return "Admin Panel | Anboard"; // Default fallback title
      }
    };

    const newTitle = getPageTitle();
    setTitle(newTitle); // Set the internal state (optional)
    document.title = newTitle; // Dynamically update the browser tab title
  }, [location.pathname]); // Run when the route changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAdmin({ upn: "123456", email: "admin@example.com" });
        setPfpLink("/path/to/profile-photo.jpg");
        setLoading(false);
      } catch (error: any) {
        setError("Failed to load admin data. Please try again later.");
      }
    };

    if (!admin.upn || !pfpLink) fetchData();
  }, [admin.upn, pfpLink]);

  const handleMenuClick = () => setMenuOpen((prevState) => !prevState);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={layout.layout}>
      {/* Sidebar */}
      <AdminSidebar handleMenuClick={handleMenuClick} menuOpen={menuOpen} />

      {/* Header */}
      <AdminHeader
        handleMenuClick={handleMenuClick}
        admin={admin}
        pfpLink={pfpLink}
        setTitle={setTitle}
        isMenuOpen={false}
      />

      {/* Main Content Area */}
      <main
        className={`${layout.main_content} ${
          menuOpen ? layout.shifted : ""
        }`}
      >

        <Outlet
          context={{
            admin,
            pfpLink,
          }}
        />
      </main>
    </div>
  );
};

export default AdminLayout;
