import React from "react"
import IProfile from "../interface/IProfile"
import profileView from '../styles/profilView.module.css'
import Ivideo from "../interface/IVideo";
import IBroadcast from "../interface/IBroadcast";
import {  useOutletContext } from "react-router-dom";

interface LayoutContext {
  //   userData: { name: string; email: string } | null;
  broadcastdata: IBroadcast[];
  videos: Ivideo[];
  pfpLink: string;
    setPfpLink: any;
    broadcaster: { upn: string; email: string };
}




const ProfilePageView: React.FC<IProfile> = ({
    name,
    date_of_birth,
    state_of_origin,
    local_government,
    post_held,
    educational_background,
}) => {

    const { pfpLink,
       broadcaster }: LayoutContext = useOutletContext();
    const navigate = useNavigate();


    return (
      <div className={profileView.container}>
        <div className={`${profileView.head_wrapper}`}>
          <div className={`${profileView.id_wrapper}`}>
            <h1>{name}</h1>
            <h2>{broadcaster.upn}</h2>
            <h3> - {post_held}</h3>
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
              <p className="profile-data-value">{name}</p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Postion held</h3>
              <p className="profile-data-value">{post_held}</p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">State of Origin</h3>
              <p className="profile-data-value">{state_of_origin}</p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Local Government</h3>
              <p className="profile-data-value">{local_government}</p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Date of Birth</h3>
              <p className="profile-data-value">
                {date_of_birth && date_of_birth.split("T")[0]}
              </p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Educational Background</h3>
              <p className="profile-data-value">{educational_background}</p>
            </div>
          </div>
        </section>
        <button onClick={() => navigate("/api/anb-broadcaster/broadcastview")}>
            View Broadcast Station
        </button>
      </div>

    );
}
import { useNavigate } from "react-router-dom";


export default ProfilePageView