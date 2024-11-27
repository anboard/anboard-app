import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../AuthContext";
import config from "../config";
import "../styles/layout.css";
import Ivideo from "../interface/IVideo";
import IBroadcast from "../interface/IBroadcast";
import {IAudio} from '../interface/IAudio';


import IProfile from "../interface/IProfile";

const Layout: React.FC = () => {
  const [broadcaster, setBroadcaster] = useState<{
    upn: string;
    email: string;
  }>({ upn: "", email: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [pfpLink, setPfpLink] = useState<string>(
    localStorage.getItem("pfpUrl") ?? ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState<Ivideo[]>([]);
  const [audioList, setAudioList] = useState<IAudio[]>([]);
  const [stationData, setStationData] = useState<IBroadcast | null>({
    base_location: "",
    association_chapter: "",
    year_started: "",
    radio_shows: [],
    station_name: "",
  });
  const [profileData, setProfileData] = useState<IProfile | null>(
    {} as IProfile as any
  );

  error;
  const { accessToken } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        const fetchData = async () => {
          try {
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
          }
        };

        const fetchPfp = async () => {
          try {
            const response = await fetch(
              `${config.API_BASE_URL}/profile/photo`,
              {
                method: "GET",
                credentials: "include",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
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
          } catch (err: any) {
            setError(err.message);
          }
        };

        const fetchStationData = async () => {
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
              console.log("error fetching broadcast data ", error);
              setError(error.error);
              throw new Error(`HTTP error! status: ${response.status}`);
              return;
            }

            const { data } = await response.json();
            setStationData(data);
          } catch (err: any) {
            setError(err.message);
          }
        };

        const fetchProfile = async () => {
          try {
            const response = await fetch(`${config.API_BASE_URL}/profile`, {
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

            const data = await response.json();
            const broadcasterProfile = data.data;
            setProfileData(broadcasterProfile);
          } catch (error: any) {
            setError(error.message);
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

        if (!pfpLink) await fetchPfp();
        if (!broadcaster.upn) await fetchData();
        if (videos.length === 0) await fetchVideos();
        await fetchStationData();
        await fetchProfile();
        await fetchAudioList();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [accessToken]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
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
            setStationData,
            profileData,
            setProfileData,
            audioList,
            setAudioList
          }}
        />
      </main>
    </div>
  );
};

export default Layout;
