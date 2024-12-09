import React from "react";
import IBroadcast from "../interface/IBroadcast";
import styles from "../styles/broadcastview.module.css";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  //   userData: { name: string; email: string } | null;
  stationData: IBroadcast;
}

const BroadcastStationView: React.FC<LayoutContext> = () => {
  const { stationData }: LayoutContext = useOutletContext();
  // const { stationData }: LayoutContext = useOutletContext();

  //  const navigate = useNavigate();

  return (
    <div className={styles.containerview}>
      <h1>Broadcast Station</h1>
      <div className={styles.group}>
        <h3>Station Name:</h3>
        <p>{stationData.station_name}</p>
      </div>
      <div className={styles.group}>
        <h3>Base Location:</h3>
        <p>{stationData.base_location}</p>
      </div>
      <div className={styles.group}>
        <h3>Association Chapter:</h3>
        <p>{stationData.association_chapter}</p>
      </div>
      <div className={styles.group}>
        <h3>Year Started:</h3>
        <p>{stationData.year_started}</p>
      </div>
      <div className={styles.group}>
        <h3>Radio Shows:</h3>
        <ol>
          {stationData.radio_shows &&
            stationData.radio_shows.map((show, index) => (
              <li key={index}>{show}</li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default BroadcastStationView;
