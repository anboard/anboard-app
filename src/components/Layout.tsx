import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../AuthContext";
import config from "../config";
import '../styles/layout.css'
import Ivideo from "../interface/IVideo";


const Layout: React.FC = ({  }) => {
  const [broadcaster, setBroadcaster] = useState<{
    upn: string;
    email: string;
  }>({ upn: "", email: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [pfpLink, setPfpLink] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const [error, setError] = useState("");
  const [videos, setVideos] = useState<Ivideo[]>([])

  

  loading
  error

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
        setPfpLink(pfpUrl);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      }
    };

    const fetchVideos = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/videos`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const error = await response.json()
                    console.log(error)
                    setError(error.error)
                    return 
                }

                const { videos } = await response.json()
                setVideos(videos)
                setLoading(false)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

    
        

    if (!broadcaster.upn) fetchData();
    if (!pfpLink) fetchPfp();
    if (videos.length === 0) fetchVideos();
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
      />} 
      
      
      <main className="main-content">
        <Outlet context={{ videos, pfpLink, setPfpLink, broadcaster }} />
      </main>
        
    </div>
  );
};

export default Layout;
