import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../AuthContext";
import config from "../config";
import layout from "../styles/layout.module.css";
import Ivideo from "../interface/IVideo";
import IBroadcast from "../interface/IBroadcast";
import { IAudio } from "../interface/IAudio";

import IProfile from "../interface/IProfile";
import {
  getMostRecentAudioUploadDate,
  getMostRecentVidUploadDate,
} from "../utils/dashUtils";

const Layout: React.FC = () => {
  const [broadcaster, setBroadcaster] = useState<{
    upn: string;
    email: string;
  }>({ upn: "", email: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [pfpLink, setPfpLink] = useState<string>(
    localStorage.getItem("pfpUrl") ?? ""
  );
  const [overlay, setOverlay] = useState(false);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState<Ivideo[]>([]);
  const [audios, setAudios] = useState<IAudio[]>([]);
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

  const [audioCount, setAudioCount] = useState<string>("0");
  const [lastVideoUpdateDate, setLastVideoUpdateDate] = useState<string>(new Date().toDateString());
  const [videoCount, setVideoCount] = useState<string>("0");
  const [lastAudioUpdateDate, setLastAudioUpdateDate] = useState<string>(new Date().toDateString());

  const [title, setTitle] = useState("Dashboard");
  title

  // loadStates
  const [pfpLoading, setPfpLoading] = useState<boolean>(true);
  const [videosLoading, setVidesoLoading] = useState<boolean>(true);
  const [videoCountLoading, setVideoCountLoading] = useState<boolean>(true);
  const [audiosLoading, setAudiosLoading] = useState<boolean>(true);
  const [stationDataLoading, setStationDataLoading] = useState<boolean>(true);
  const [profileDataLoading, setProfileDataLoading] = useState<boolean>(true);

  error;
  const { accessToken } = useAuth();


  
 // Use React Router's `useLocation` to track the current route
  const location = useLocation();

  // Dynamically update the page and tab title based on the current route
  useEffect(() => {
    const getPageTitle = (): string => {
      switch (location.pathname) {
        case "/api/anb-broadcaster/profile":
          return "Profile";
        case "/api/anb-broadcaster/dashboard":
          return "Dashboard";
        case "/api/anb-broadcaster/videos":
          return "Videos";
        case "/api/anb-broadcaster/videos/upload":
          return "Upload Video";
        case "/api/anb-broadcaster/audios":
          return "Audios";
        case "/api/anb-broadcaster/audios/upload":
          return "Upload Audio";
        case "/api/anb-broadcaster/station":
          return "Station";
        default:
          return " Anboard"; // Default fallback title
      }
    };

    const newTitle = getPageTitle();
    setTitle(newTitle); // Set the internal state (optional)
    document.title = newTitle; // Dynamically update the browser tab title
  }, [location.pathname]); // Run when the route changes

  useEffect(() => {
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
        console.log({pfpUrl})
        setPfpLink(pfpUrl ? pfpUrl : ""); 
        setPfpLoading(false);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      }
    };

    if (!pfpLink) fetchPfp();
  }, [pfpLink, accessToken]);

  useEffect(() => {

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
        if (videos) {
          const lastVidUpload = getMostRecentVidUploadDate(videos);

        const uploadDate = lastVidUpload?.upload_date as Date;
        const fVideoDate = new Date(uploadDate);

        fVideoDate.setHours(fVideoDate.getHours() + 1);

        setLastVideoUpdateDate(fVideoDate.toDateString());
        setVideos(videos.message ? null : videos);
        }
        setVidesoLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchVideos();
  }, [accessToken]);

  useEffect(() => {
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
          setError(error.error);
          throw new Error(`HTTP error! status: ${response.status}`);
          return;
        }

        const { data } = await response.json();
        setStationData(data);
        setStationDataLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchStationData();
  }, [accessToken]);

  useEffect(() => {
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
        setProfileDataLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProfile();
  }, [accessToken]);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/audios`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const error = await response.json();
          setError(error.message || "Failed to fetch audio list");
          return;
        }

        const { audios } = await response.json();
        if (audios) {
          const lastAudioUpload = getMostRecentAudioUploadDate(audios);

          const uploadDate = lastAudioUpload?.upload_date as Date;
          const fAudioDate = new Date(uploadDate);

          fAudioDate.setHours(fAudioDate.getHours() + 1);

          setLastAudioUpdateDate(fAudioDate.toDateString());
          setAudios(audios);
        }
        setAudiosLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch audios");
      }
    };

    fetchAudios();
  }, [accessToken]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const error = await response.json();
          setError(error.message || "Failed to dashboard data");
          return;
        }

        const data = await response.json();

        const { broadcaster, audioCount, videoCount } = data.data;
        setBroadcaster(broadcaster);
        setAudioCount(audioCount[0].audio_count);
        setVideoCount(videoCount[0].video_count);
        setVideoCountLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to fetch dashboard data");
      }
    };

    fetchDashboardData();
  }, [accessToken]);

  if (
    pfpLoading ||
    videosLoading ||
    audiosLoading ||
    stationDataLoading ||
    profileDataLoading ||
    videoCountLoading
  ) {
    return <p>{pfpLoading} Loading...</p>;
  }

  return (
    <div className={layout.layout}>
      {<Sidebar handleMenuClick={handleMenuClick} menuOpen={menuOpen} />}

      {overlay && <div className={`${layout.overlay}`}></div>}
      <Header
        handleMenuClick={handleMenuClick}
        broadcaster={broadcaster}
        pfpLink={pfpLink}
        setTitle={setTitle}
        isMenuOpen={menuOpen}
      />
      <main
        className={`${layout.main_content} ${menuOpen ? layout.shifted : ""}`}
      >
        <Outlet
          context={{
            menuOpen,
            setOverlay,
            videos,
            setVideos,
            pfpLink,
            setPfpLink,
            broadcaster,
            stationData,
            setStationData,
            profileData,
            setProfileData,
            audios,
            setAudios,
            audioCount,
            setAudioCount,
            lastAudioUpdateDate,
            videoCount,
            setVideoCount,
            lastVideoUpdateDate,
          }}
        />
      </main>
    </div>
  );
};

export default Layout;
