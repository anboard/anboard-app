import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../AuthContext";
import config from "../config";
import layout from "../styles/layout.module.css";
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
  // const [loading, setLoading] = useState(true);
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

  // loadStates
  const [broadcasterLoading, setBroadcasterLoading] = useState<boolean>(true)
  const [pfpLoading, setPfpLoading] = useState<boolean>(true)
  const [videosLoading, setVidesoLoading] = useState<boolean>(true)
  const [audiosLoading, setAudiosLoading] = useState<boolean>(true)
  const [stationDataLoading, setStationDataLoading] = useState<boolean>(true)
  const [profileDataLoading, setProfileDataLoading] = useState<boolean>(true)

  error;
  const { accessToken } = useAuth();

  useEffect(() => {
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
        console.log(broadcaster)
        setBroadcaster(broadcaster);
        setBroadcasterLoading(false)
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      }
    };

    if (!broadcaster.upn) fetchData();
  }, [accessToken])

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
        setPfpLink(pfpUrl);
        setPfpLoading(false)
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      }
    };

    if (!pfpLink) fetchPfp();
  }, [pfpLink, accessToken])

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
        setVideos(videos);
        setVidesoLoading(false)
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (videos.length === 0) fetchVideos();
  }, [accessToken])

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
        setStationDataLoading(false)
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchStationData();
  }, [accessToken])

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
        setProfileDataLoading(false)
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProfile()
  }, [accessToken])

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
        setAudios(audios);
        setAudiosLoading(false)
      } catch (err: any) {
        setError(err.message || "Failed to fetch audios");
      }
    };

    fetchAudios()
  }, [accessToken])




  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  if (broadcasterLoading && pfpLoading && videosLoading && audiosLoading && stationDataLoading && profileDataLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={layout.layout}>
      <Header
        handleMenuClick={handleMenuClick}
        broadcaster={broadcaster}
        pfpLink={pfpLink}
      />
      {menuOpen && <Sidebar handleMenuClick={handleMenuClick} />}

      <main className={layout.main_content}>
        <Outlet
          context={{
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
            setAudios
          }}
        />
      </main>
    </div>
  );
};

export default Layout;
