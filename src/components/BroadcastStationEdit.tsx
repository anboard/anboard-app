import React, { useState } from "react";
import config from "../config";
import IBroadcast from "../interface/IBroadcast";
import { useAuth } from "../AuthContext";
import styles from "../styles/broadcastedit.module.css";

const BroadcastStationEdit: React.FC<{
  broadcastdata: IBroadcast;
  updatebroadcastdata: any;
  handleCancel: () => void;
  setIsEditing: any;
  pfpLink: string;
setPfpLink: any
}> = ({
  broadcastdata,
  updatebroadcastdata,
  handleCancel,
  setIsEditing,

}) => {
  const [editedStation, setEditedStation] = useState(broadcastdata.station);
  const [editedBaseLocation, setEditedBaseLocation] = useState(broadcastdata.base_location);
  const [editedAssociationChapter, setEditedAssociationChapter] = useState(
    broadcastdata.association_chapter
  );
  const [editedYearStarted, setEditedYearStarted] = useState(broadcastdata.year_started);
  const [editedRadioShows, setEditedRadioShows] = useState(broadcastdata.radio_shows);

  const { accessToken } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleRadioShowChange = (index: number, value: string) => {
    const updatedRadioShows = [...editedRadioShows];
    updatedRadioShows[index] = value;
    setEditedRadioShows(updatedRadioShows);
    updatebroadcastdata({ ...broadcastdata.radio_shows, radio_shows: updatedRadioShows });
  };

  const addRadioShowField = () => {
    setEditedRadioShows([...editedRadioShows, ""]);
  };
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/broadcast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ broadcastdata }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setIsSaved(true);
        setIsSaving(false);
        setTimeout(() => {
          setIsEditing(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving broadcast data:", error);
      alert("Failed to save broadcast data.");
    }    
};
 


  return (
    <form onSubmit={handleSubmit}>
    <div className={styles.container}>
      <h1>Edit Broadcast Station</h1>
      <div className={styles.group}>
        <label>Station Name:</label>
        <input
          type="text"
          value={editedStation}
          onChange={(e) => setEditedStation(e.target.value)}
        />
      </div>
      <div className={styles.group}>
        <label>Base Location:</label>
        <input
          type="text"
          value={editedBaseLocation}
          onChange={(e) => setEditedBaseLocation(e.target.value)}
        />
      </div>
      <div className={styles.group}>
        <label>Association Chapter:</label>
        <input
          type="text"
          value={editedAssociationChapter}
          onChange={(e) => setEditedAssociationChapter(e.target.value)}
        />
      </div>
      <div className={styles.group}>
        <label>Year Started:</label>
        <input
          type="text"
          value={editedYearStarted}
          onChange={(e) => setEditedYearStarted(parseInt(e.target.value))}
        />
      </div>
      <div className={styles.group}>
        <label>Radio Shows:</label>
        {editedRadioShows.map((show, index) => (
          <div key={index}>
            <input
              type="text"
              value={show}
              onChange={(e) => handleRadioShowChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addRadioShowField}>
          Add Radio Show
        </button>
      </div>
      <button type="submit" disabled={isSaved}>
          {isSaving ? "Saving broadcast data..." : "Broadcast Dta Saved"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        {isSaved && (
          <p style={{ color: "green" }}>Saved data successfully</p>
        )}
      
    </div>
    </form>
  );
};

export default BroadcastStationEdit;
