import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../AuthContext";
import config from "../config";
import "../styles/layout.css";
import Ivideo from "../interface/IVideo";
import IBroadcast from "../interface/IBroadcast";
import {IAudio, AudioContext} from '../interface/IAudio';



const Layout: React.FC = () => {
  console.log("Layout component rendering");
  const [broadcaster, setBroadcaster] = useState<{
    upn: string;
    email: string;
  }>({ upn: "", email: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [pfpLink, setPfpLink] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState<Ivideo[]>([]);
  const [stationData, setBroadcastData] = useState<IBroadcast>({base_location: "", association_chapter: "", year_started: "", radio_shows: [], station_name: ""});
  error
  const [audioList, setAudioList] = useState<IAudio[]>([]);
  const { accessToken } = useAuth();

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
          method: "GET",
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

        const { videos } = await response.json();
        setVideos(videos);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBroadcastData = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/station`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const error = await response.json();
          console.log("error fetching broadcast data ",error);
          setError(error.error);
          throw new Error(`HTTP error! status: ${response.status}`);
          
        }

        const {data} = await response.json();
        console.log("Fetched Broadcast Data:", data);
        setBroadcastData(data);
        // setLoading(false);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching broadcast data:', error);
      } finally {
        setLoading(false);
      }
    };

      const fetchAudioList = async () => {
        try {
          const response = await fetch(`${config.API_BASE_URL}/audios`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          if (!response.ok) {
            const error = await response.json();
            setError(error.message || "Failed to fetch audio list");
            return;
          }
    
          const { audios } = await response.json();
          setAudioList(audios);
        } catch (err: any) {
          setError(err.message || "Failed to fetch audios");
        }
      };
    
      
      if (!broadcaster.upn) fetchData();
      if (!pfpLink) fetchPfp();
      if (videos.length === 0) fetchVideos();
      fetchBroadcastData();
      fetchAudioList();
  }, [accessToken]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
console.log(stationData)  
  return (
    <div className="layout">
      <Header
        handleMenuClick={handleMenuClick}
        broadcaster={broadcaster}
        pfpLink={pfpLink}
      />
      {menuOpen && <Sidebar handleMenuClick={handleMenuClick} />}

      <main className="main-content">
        <Outlet
          context={{
            videos,
            pfpLink,
            setPfpLink,
            broadcaster,
            stationData,
            setBroadcastData,
            audioList,
            setAudioList
          }}
        />
      </main>
    </div>
  );
};

export default Layout;
