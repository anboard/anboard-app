import React from "react";
import IBroadcast from "../interface/IBroadcast";
import styles from "../styles/broadcastview.module.css";
// import Ivideo from "../interface/IVideo";
import {  useOutletContext } from "react-router-dom";


interface LayoutContext {
  //   userData: { name: string; email: string } | null;
  broadcastdata: IBroadcast;
}


const BroadcastStationView: React.FC<LayoutContext> = () => {
  const { broadcastdata }: LayoutContext = useOutletContext();
  // const { broadcastdata }: LayoutContext = useOutletContext();

    //  const navigate = useNavigate();
    

  return (
    
    <div className={styles.container}>
      <h1>Broadcast Station</h1>
      <div className={styles.group}>
        <h3>Station Name:</h3>
        <p>{broadcastdata.station}</p>
      </div>
      <div className={styles.group}>
        <h3>Base Location:</h3>
        <p>{broadcastdata.base_location}</p>
      </div>
      <div className={styles.group}>
        <h3>Association Chapter:</h3>
        <p>{broadcastdata.association_chapter}</p>
      </div>
      <div className={styles.group}>
        <h3>Year Started:</h3>
        <p>{broadcastdata.year_started}</p>
      </div>
      <div className={styles.group}>
        <h3>Radio Shows:</h3>
        <ol>
          {/* {broadcastdata.radio_shows.map((show, index) => (
            <li key={index}>{show}</li>
          ))} */}
        </ol>
      </div>
    </div>
  );
};





export default BroadcastStationView;
