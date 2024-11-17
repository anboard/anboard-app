import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../AuthContext";
import config from "../config";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC = ({  }) => {
  const [broadcaster, setBroadcaster] = useState<{
    upn: string;
    email: string;
  }>({ upn: "", email: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [pfpLink, setPfp] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { accessToken, logout } = useAuth();
  const [error, setError] = useState("");




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_BASE_URL}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const error = await response.json();
          setError(error.error);
          return;
        }

        const { broadcaster } = await response.json();
        setBroadcaster(broadcaster);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const fetchPfp = async () => {
      console.log("dash pfp fetch");
      try {
        const response = await fetch(`${config.API_BASE_URL}/profile/photo`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const { pfpUrl } = await response.json();
        console.log(pfpUrl);
        setPfp(pfpUrl);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      }
    };

    if (!broadcaster.upn) fetchData();
    if (!pfpLink) fetchPfp();
  }, [accessToken]);

  const handleMenuClick = () => {

    setMenuOpen(!menuOpen);
  }
  
  return (
    <div className="layout">
      <Header
        handleMenuClick={handleMenuClick}
        broadcaster={broadcaster}
        pfpLink={pfpLink}
      />
      {menuOpen && <Sidebar
        handleMenuClick={handleMenuClick}
        broadcaster={broadcaster}
      />} 
      
      <main className="main-content">
        <Outlet />
      </main>
        
    </div>
  );
};

export default Layout;
