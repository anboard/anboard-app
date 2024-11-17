import React from "react"
import IProfile from "../interface/IProfile"
import profileView from '../styles/profilView.module.css'
import Ivideo from "../interface/IVideo";
import {  useOutletContext } from "react-router-dom";

interface LayoutContext {
  //   userData: { name: string; email: string } | null;
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
    base_location,
    association_chapter,
    post_held,
    radio_shows,
    station,
    year_started,
    educational_background,
}) => {

    const { pfpLink, broadcaster }: LayoutContext = useOutletContext();
    // const navigate = useNavigate();


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

        <section className={`${profileView.section}`}>
          <h2>Station</h2>
          <div className={`${profileView.section_body}`}>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Station Name</h3>
              <p className="profile-data-value">{station}</p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Base Location</h3>
              <p className="profile-data-value">{base_location}</p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Association Chapter</h3>
              <p className="profile-data-value">{association_chapter}</p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Year Started</h3>
              <p className="profile-data-value">{year_started}</p>
            </div>
            <div className={`${profileView.group}`}>
              <h3 className="profile-data-label">Radio Shows</h3>
              <ol>
                {radio_shows &&
                  radio_shows.map((show) => <li key={show}>{show}</li>)}
              </ol>
            </div>
          </div>
        </section>
      </div>
    );
}

export default ProfilePageView