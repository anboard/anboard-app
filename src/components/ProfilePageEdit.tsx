import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import IProfile from "../interface/IProfile";
import config from "../config";
import styles from "../styles/dashboard.module.css";


const EditProfileForm: React.FC<{
  profileData: IProfile;
  updateProfileData: any;
  handleCancel: () => void;
  setIsEditing: any;
    pfpLink: string;
  setPfpLink: any
}> = ({
  profileData,
  updateProfileData,
  handleCancel,
  setIsEditing,
    pfpLink,
  setPfpLink
}) => {
  
  const [name, setName] = useState(profileData.name || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    profileData.date_of_birth || ""
  );
  const [stateOfOrigin, setStateOfOrigin] = useState(
    profileData.state_of_origin || ""
  );
  const [localGovernment, setLocalGovernment] = useState(
    profileData.local_government || ""
  );
  const [baseLocation, setBaseLocation] = useState(
    profileData.base_location || ""
  );
  const [associationChapter, setAssociationChapter] = useState(
    profileData.association_chapter || ""
  );
  const [postHeld, setPostHeld] = useState(profileData.post_held || "");
  const [radio_shows, setRadioShows] = useState(
    profileData.radio_shows || [""]
  );
  const [station, setStation] = useState(profileData.station || "");
  const [yearStarted, setYearStarted] = useState(
    profileData.year_started || ""
  );
  const [educationalBackground, setEducationalBackground] = useState(
    profileData.educational_background || ""
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  photoFile;

  const { accessToken } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPfpEdit, setIsPfpEdit] = useState(false);
  const [pfpSave, setPfpSave] = useState(false);

  const handleInputChange = (
    setter: (value: string) => void,
    key: string,
    value: string
  ) => {
    setter(value);
    updateProfileData({ ...profileData, [key]: value });
  };

  const handleRadioShowChange = (index: number, value: string) => {
    const updatedRadioShows = [...radio_shows];
    updatedRadioShows[index] = value;
    setRadioShows(updatedRadioShows);
    updateProfileData({ ...profileData, radio_shows: updatedRadioShows });
  };

  const addRadioShowField = () => {
    setRadioShows([...radio_shows, ""]);
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please select an image.");
        return;
      }

      const maxSize = 5 * 1024 * 1024; 
      if (file.size > maxSize) {
        alert("File is too large. Please select a file under 5MB.");
        return;
      }
        setPhotoFile(e.target.files[0]);
      setPfpSave(true);
    }
  };
    
    const handlePfpSave = async () => {
      if (!photoFile) {
        return; 
      }

      const formData = new FormData();
      formData.append("pfp", photoFile);

      try {
        const response = await fetch(`${config.API_BASE_URL}/profile/photo`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData, 
        });

        if (response.ok) {
          const { pfpUrl } = await response.json();
            console.log("Profile picture saved:", pfpUrl);
            setPfpLink(pfpUrl);
            setPfpSave(false);
            setIsPfpEdit(false)
        } else {
          throw new Error("Failed to save profile picture.");
        }
      } catch (error) {
        console.error("Error saving profile picture:", error);
        alert("Failed to save profile picture.");
      }
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      const response = await fetch(`${config.API_BASE_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ profileData }),
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
      console.error("Error saving profile data:", error);
      alert("Failed to save profile data.");
    }
  };

  return (
    <div>
      <div className="edit-pfp-wrapper">
        <img
          width={"100px"}
          height={"100px"}
          src={pfpLink}
          alt="Profile Picture"
          className={styles.profileimage}
          onClick={() => {
            setIsPfpEdit(!isPfpEdit);
            console.log("clicked");
          }}
        />
        <div>
          <input
            type="file"
            accept="images/*"
            onChange={handlePhotoFileChange}
            style={{ display: isPfpEdit ? "block" : "none" }}
          />

          <div>
            {pfpSave && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => setPfpSave(false)}
                  title="Cancel Changes"
                >
                  Cancel
                </button>
                <button onClick={handlePfpSave} title="Save Changes">
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* PERSONAL INFORMATION FIELDSET */}
        <fieldset>
          <legend>
            <h2>Personal</h2>
          </legend>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) =>
                handleInputChange(setName, "name", e.target.value)
              }
            />
          </div>
          <div>
            <label>Post Held:</label>
            <input
              type="text"
              value={postHeld}
              onChange={(e) =>
                handleInputChange(setPostHeld, "post_held", e.target.value)
              }
            />
          </div>
          <div>
            <label>State of Origin:</label>
            <input
              type="text"
              value={stateOfOrigin}
              onChange={(e) =>
                handleInputChange(
                  setStateOfOrigin,
                  "state_of_origin",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label>Local Government:</label>
            <input
              type="text"
              value={localGovernment}
              onChange={(e) =>
                handleInputChange(
                  setLocalGovernment,
                  "local_government",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              value={dateOfBirth.split("T")[0]}
              onChange={(e) =>
                handleInputChange(
                  setDateOfBirth,
                  "date_of_birth",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label>Educational Background:</label>
            <textarea
              value={educationalBackground}
              onChange={(e) =>
                handleInputChange(
                  setEducationalBackground,
                  "educational_background",
                  e.target.value
                )
              }
            />
          </div>
        </fieldset>

        {/* BROADCAST STATION FIELDSET */}
        <fieldset>
          <legend>
            <h2>Broadcast Station</h2>
          </legend>
          <div>
            <label>Station Name:</label>
            <input
              type="text"
              value={station}
              onChange={(e) =>
                handleInputChange(setStation, "station", e.target.value)
              }
            />
          </div>
          <div>
            <label>Base Location:</label>
            <input
              type="text"
              value={baseLocation}
              onChange={(e) =>
                handleInputChange(
                  setBaseLocation,
                  "base_location",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label>Association Chapter:</label>
            <input
              type="text"
              value={associationChapter}
              onChange={(e) =>
                handleInputChange(
                  setAssociationChapter,
                  "association_chapter",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label>Year Started:</label>
            <input
              type="number"
              value={yearStarted}
              onChange={(e) =>
                handleInputChange(
                  setYearStarted,
                  "year_started",
                  String(parseInt(e.target.value)) || ""
                )
              }
            />
          </div>
          <div>
            <label>Radio Shows:</label>
            {radio_shows.map((show, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={show}
                  onChange={(e) => handleRadioShowChange(index, e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={addRadioShowField}>
              Add Show
            </button>
          </div>
        </fieldset>

        <button type="submit" disabled={isSaved}>
          {isSaving ? "Saving profile" : "Save profile"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        {isSaved && (
          <p style={{ color: "green" }}>Saved Profile successfully</p>
        )}
      </form>
    </div>
  );
};

export default EditProfileForm;
