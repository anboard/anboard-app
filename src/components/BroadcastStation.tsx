import React, { useRef, useState } from "react";
import BroadcastStationView from "./BroadcastStationView";
import IBroadcast from "../interface/IBroadcast";
import EditBroadcastStation from "./BroadcastStationEdit";
import { useOutletContext } from "react-router-dom";
import styles from "../styles/broadcastview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";


interface LayoutContext {
  stationData: IBroadcast;
  setStationData: React.Dispatch<React.SetStateAction<IBroadcast>>;
}

const NBroadcastStation: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const originalBroadcastStationRef = useRef<IBroadcast>({} as IBroadcast);

  const { stationData, setStationData } = useOutletContext<LayoutContext>();

  const updateStationData = (updatedFields: any) => {
    setStationData((prevData: any) => ({
      ...prevData,
      ...updatedFields,
    }));
  };

  const handleEditClick = () => {
    originalBroadcastStationRef.current = stationData;
    setIsEditing(true);
  };

  const handleCancel = () => {
    setStationData(originalBroadcastStationRef.current);
    setIsEditing(false);
  };

  return (
    <div className={styles.broadcaststation}>
      {!isEditing ? (
      <div onClick={handleEditClick}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={styles.edit_icon}
        />
        <BroadcastStationView stationData={stationData} />
      </div>
      ) : (
        <EditBroadcastStation
          updateStationData={updateStationData}
          handleCancel={handleCancel}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};
export default NBroadcastStation;
