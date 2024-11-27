import React, { useRef, useState } from "react";
import { useAuth } from "../AuthContext";
import BroadcastStationView from "./BroadcastStationView";
import IBroadcast from "../interface/IBroadcast";
import EditBroadcastStation from "./BroadcastStationEdit";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  stationData: IBroadcast;
  setStationData: React.Dispatch<React.SetStateAction<IBroadcast>>;
}

const NBroadcastStation: React.FC = () => {
  const { logout } = useAuth();
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
    <div>
      {!isEditing ? (
        <div>
          <BroadcastStationView stationData={stationData} />
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
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
