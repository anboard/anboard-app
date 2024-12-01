import React from "react";
import IProfile from "../interface/IProfile";
import profileView from "../styles/profilView.module.css";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  pfpLink: string;
  broadcaster: { upn: string; email: string };
  profileData: IProfile;
}

const ProfilePageView: React.FC<{ handleEditClick: () => void }> = ({
  handleEditClick,
}) => {
  const { pfpLink, broadcaster, profileData }: LayoutContext =
    useOutletContext();

  // return (
  //   <div className={profileView.container}>
  //     <div className={`${profileView.head_wrapper}`}>
  //       <div className={`${profileView.image_wrapper}`}>
  //         <div>
  //           <p>UPN: {broadcaster.upn}</p>
  //         <p>Email: {broadcaster.email}</p>
  //         </div>
  //         <img
  //           src={pfpLink}
  //           alt="Profile"
  //           className={`${profileView.profile_pic}`}
  //         />
  //       </div>
  //       {/* <div className={`${profileView.id_wrapper}`}>
  //         <h1>{profileData.name}</h1>
  //         <h2>{broadcaster.upn}</h2>
  //         <h3> - {profileData.post_held}</h3>
  //       </div> */}
  //       <div className={`${profileView.id_wrapper}`}>
  //         <div>
  //           <p>Name</p>
  //           <p>{profileData.name}</p>
  //         </div>

  //         <div>
  //           <p>Position held</p>
  //           <p>{profileData.post_held}</p>
  //         </div>

  //         <div>
  //           <p>State of Origin</p>
  //           <p>{profileData.state_of_origin}</p>
  //         </div>

  //         <div>
  //           <p>L.G.A</p>
  //           <p>{profileData.local_government}</p>
  //         </div>

  //         <div>
  //           <p>Date of birth</p>
  //           <p>
  //             {profileData.date_of_birth &&
  //               profileData.date_of_birth.split("T")[0]}
  //           </p>
  //         </div>

  //         <div>
  //           <p>Educational Background</p>
  //           <p>{profileData.educational_background}</p>
  //         </div>
  //       </div>
  //     </div>

  //     <button type="button" onClick={handleEditClick}>
  //       Edit
  //     </button>
  //   </div>
  // );

  return (
    <div className={`${profileView.profile_container}`}>
      <div className={`${profileView.profile_section_one}`}>
        <div className={`${profileView.section_one_head}`}>
          <img
            src={pfpLink}
            alt="Profile"
            className={`${profileView.profile_pic}`}
          />
          <div className={`${profileView.section_one_head_text}`}>
            <p>{profileData.name}</p>

            <p>{profileData.post_held}</p>
          </div>
        </div>

        <form
          className={`${profileView.broadcaster_info} ${profileView.profile_card}`}
        >
          <legend>Broadcaster Information</legend>
          <div className={`${profileView.form_group_wrapper}`}>
            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={broadcaster.upn} disabled />
              <label>UPN</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={profileData.post_held} />
              <label>Post Held</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={"Cool FM"} />
              <label>Station</label>
            </div>
          </div>
        </form>
      </div>

      <div className={`${profileView.profile_section_two}`}>
        <form
          className={`${profileView.personal_info} ${profileView.profile_card}`}
        >
          <legend>Personal Information</legend>

          <div className={`${profileView.form_group_wrapper}`}>
            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={profileData.name} />
              <label>Full Name</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={broadcaster.email} />
              <label>Email Address</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={profileData.state_of_origin} />
              <label>State of Origin</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={profileData.local_government} />
              <label>Local Government</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={profileData.date_of_birth &&
                profileData.date_of_birth.split("T")[0]} />
              <label>Date of Birth</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required value={profileData.educational_background} />
              <label>Educational Background</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePageView;
