import React from "react";
import IProfile from "../interface/IProfile";
import profileView from "../styles/profilView.module.css";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  pfpLink: string;
  broadcaster: { upn: string; email: string };
  profileData: IProfile;
  menuOpen: boolean;
}

const ProfilePageView: React.FC<{ handleEditClick: () => void }> = ({
  // handleEditClick,
}) => {
  const { pfpLink, broadcaster, profileData, menuOpen }: LayoutContext =
    useOutletContext();

  return (
    <div className={`${profileView.profile_container} ${menuOpen ? profileView.single_grid : ""}`}>
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
              <input type="text" id="fullName" placeholder="" required value={broadcaster.upn}  readOnly />
              <label>UPN</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required defaultValue={profileData.post_held} />
              <label>Post Held</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required defaultValue={"Cool FM"} />
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
              <input type="text" id="fullName" placeholder="" required defaultValue={profileData.name} />
              <label>Full Name</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required defaultValue={broadcaster.email} />
              <label>Email Address</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required defaultValue={profileData.state_of_origin} />
              <label>State of Origin</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required defaultValue={profileData.local_government} />
              <label>Local Government</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input type="text" id="fullName" placeholder="" required defaultValue={profileData.date_of_birth &&
                profileData.date_of_birth.split("T")[0]} />
              <label>Date of Birth</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <textarea  id="fullName" placeholder="" required defaultValue={profileData.educational_background} rows={5} cols={30} maxLength={150} />
              <label>Educational Background</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePageView;
