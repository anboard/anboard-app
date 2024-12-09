import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import config from "../config";
import admindash from "../styles/admindashboard.module.css";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAudio,
  faFileVideo,
} from "@fortawesome/free-regular-svg-icons";
import {
  faRadio,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

interface LayoutContext {
  menuOpen: boolean;
  videoCount: string;
  audioCount: string;
  broadcastCount: string;
  stationsCount: string;
  lastVideoUpdateDate: string;
  lastAudioUpdateDate: string;
  lastBroadcastUpdateDate: string;
  lastStationUpdateDate: string;
}

const AdminDashboard: React.FC = () => {
  const {
    menuOpen
  }: LayoutContext = useOutletContext();

  const { accessToken } = useAuth();

  // Local state to store data
  const [dashboardData, setDashboardData] = useState({
    videoCount: 0,
    audioCount: 0,
    broadcastCount: 0,
    stationsCount: 0,
    lastVideoUpdateDate: "",
    lastAudioUpdateDate: "",
    lastBroadcastUpdateDate: "",
    lastStationUpdateDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend
        const response = await fetch(`${config.API_ADMIN_URL}/dashboard`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        
        // Log the response to verify the structure
        console.log("Fetched data:", responseData);
  
        if (responseData.status === "success") {
          const data = responseData.data;
  
          setDashboardData({
            videoCount: parseInt(data.video.videoCount, 10) || 0,
            audioCount: parseInt(data.audio.audioCount, 10) || 0,
            broadcastCount: parseInt(data.broadcaster.broadcasterCount, 10) || 0,
            stationsCount: parseInt(data.station.stationCount, 10) || 0,
            lastVideoUpdateDate: data.video.lastAudioUploadDate || "",
            lastAudioUpdateDate: data.audio.lastAudioUploadDate || "",
            lastBroadcastUpdateDate: data.broadcaster.lastBroadcasterJoinDate || "",
            lastStationUpdateDate: data.station.lastStationAddDate || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [accessToken]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  

  return (
    <div
      className={`${admindash.container} ${menuOpen ? admindash.menu_open : ""}`}
    >
      <div className={`${admindash.audio_video_wrapper} ${admindash.small_flex}`}>
        {/* Video Section */}
        <div className={`${admindash.pill}`}>
          <p className={`${admindash.pill_title}`}>Videos</p>
          <div className={`${admindash.pill_body}`}>
            <div className={`${admindash.pill_icon_wrapper}`}>
              <FontAwesomeIcon className={`${admindash.pill_icon}`} icon={faFileVideo} />
            </div>
            <div className={`${admindash.pill_info}`}>
              <p>{dashboardData.videoCount}</p>
              <small>
              As of {formatDate(dashboardData.lastVideoUpdateDate || "")}
              </small>
            </div>
          </div>
        </div>

        {/* Audio Section */}
        <div className={`${admindash.pill}`}>
          <p className={`${admindash.pill_title}`}>Audios</p>
          <div className={`${admindash.pill_body}`}>
            <div className={`${admindash.pill_icon_wrapper}`}>
              <FontAwesomeIcon className={`${admindash.pill_icon}`} icon={faFileAudio} />
            </div>
            <div className={`${admindash.pill_info}`}>
              <p>{dashboardData.audioCount}</p>
              <small>
              {dashboardData.lastAudioUpdateDate
                ? `As of ${formatDate(dashboardData.lastAudioUpdateDate)}`
                : "-"}
              </small>
            </div>
          </div>
        </div>

        {/* Stations Section */}
        <div className={`${admindash.pill}`}>
          <p className={`${admindash.pill_title}`}>Stations</p>
          <div className={`${admindash.pill_body}`}>
            <div className={`${admindash.pill_icon_wrapper}`}>
              <FontAwesomeIcon className={`${admindash.pill_icon}`} icon={faRadio} />
            </div>
            <div className={`${admindash.pill_info}`}>
              <p>{dashboardData.stationsCount}</p>
              <small>
              As of {formatDate(dashboardData.lastStationUpdateDate || "")}
              </small>
            </div>
          </div>
        </div>

        {/* Broadcasters Section */}
        <div className={`${admindash.pill}`}>
          <p className={`${admindash.pill_title}`}>Broadcasters</p>
          <div className={`${admindash.pill_body}`}>
            <div className={`${admindash.pill_icon_wrapper}`}>
              <FontAwesomeIcon className={`${admindash.pill_icon}`} icon={faPeopleGroup} />
            </div>
            <div className={`${admindash.pill_info}`}>
              <p>{dashboardData.broadcastCount}</p>
              <small>
              {dashboardData.lastBroadcastUpdateDate
                ? `As of ${formatDate(dashboardData.lastBroadcastUpdateDate)}`
                : "-"}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
