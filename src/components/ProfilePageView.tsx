import React from "react";
import IProfile from "../interface/IProfile";
import profileView from "../styles/profilView.module.css";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  pfpLink: string;
  broadcaster: { upn: string; email: string };
  profileData: IProfile;
}

const ProfilePageView: React.FC = () => {
  const { pfpLink, broadcaster, profileData }: LayoutContext = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className={profileView.container}>
      <div className={`${profileView.head_wrapper}`}>
        <div className={`${profileView.id_wrapper}`}>
          <h1>{profileData.name}</h1>
          <h2>{broadcaster.upn}</h2>
          <h3> - {profileData.post_held}</h3>
        </div>
        <img
          src={pfpLink}
          alt="Profile"
          className={`${profileView.profile_pic}`}
        />
      </div>

      <section className={`${profileView.section}`}>
        <h2>Personal</h2>
        <div className={`${profileView.section_body}`}>
          <div className={`${profileView.group}`}>
            <h3 className="profile-data-label">Name</h3>
            <p className="profile-data-value">{profileData.name}</p>
          </div>
          <div className={`${profileView.group}`}>
            <h3 className="profile-data-label">Postion held</h3>
            <p className="profile-data-value">{profileData.post_held}</p>
          </div>
          <div className={`${profileView.group}`}>
            <h3 className="profile-data-label">State of Origin</h3>
            <p className="profile-data-value">{profileData.state_of_origin}</p>
          </div>
          <div className={`${profileView.group}`}>
            <h3 className="profile-data-label">Local Government</h3>
            <p className="profile-data-value">{profileData.local_government}</p>
          </div>
          <div className={`${profileView.group}`}>
            <h3 className="profile-data-label">Date of Birth</h3>
            <p className="profile-data-value">
              {profileData.date_of_birth && profileData.date_of_birth.split("T")[0]}
            </p>
          </div>
          <div className={`${profileView.group}`}>
            <h3 className="profile-data-label">Educational Background</h3>
            <p className="profile-data-value">{profileData.educational_background}</p>
          </div>
        </div>
      </section>
      <button onClick={() => navigate("/api/anb-broadcaster/broadcastview")}>
        View Broadcast Station
      </button>
    </div>
  );
};
import { useNavigate } from "react-router-dom";

export default ProfilePageView;
