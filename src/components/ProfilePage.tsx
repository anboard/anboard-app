import React, { useRef, useState } from "react";
import { useAuth } from "../AuthContext";
import ProfilePageView from "./ProfilePageView";
import IProfile from "../interface/IProfile";
import EditProfileForm from "./ProfilePageEdit";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  profileData: IProfile;
  setProfileData: React.Dispatch<React.SetStateAction<IProfile>>;
}

const NProfilePage: React.FC = () => {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const originalProfileDataRef = useRef<IProfile>({} as IProfile);

  const { profileData, setProfileData }: LayoutContext = useOutletContext();

  const updateProfileData = (updatedFields: any) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...updatedFields,
    }));
  };

  const handleEditClick = () => {
    originalProfileDataRef.current = profileData;
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setProfileData(originalProfileDataRef.current);
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <ProfilePageView />
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
        </div>
      ) : (
        <EditProfileForm
          updateProfileData={updateProfileData}
          handleCancel={handleCancel}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};
export default NProfilePage;
