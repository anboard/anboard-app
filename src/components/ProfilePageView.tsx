import React from "react";
import IProfile from "../interface/IProfile";
import profileView from "../styles/profilView.module.css";
import header from "../styles/header.module.css";
import { useOutletContext } from "react-router-dom";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LayoutContext {
  pfpLink: string;
  broadcaster: { upn: string; email: string };
  menuOpen: boolean;
  profileData: IProfile;
}

const ProfilePageView: React.FC<{ handleEditClick: () => void }> = ({
  handleEditClick,
}) => {
  const { pfpLink, broadcaster, profileData, menuOpen }: LayoutContext =
    useOutletContext();

  return (
    <div
      className={`${profileView.profile_container} ${
        menuOpen ? profileView.single_grid : ""
      }`}
    >
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
          <legend>
            Broadcaster Information
            <div onClick={handleEditClick}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className={header.notification}
              />
            </div>
          </legend>
          <div className={`${profileView.form_group_wrapper}`}>
            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                value={broadcaster.upn}
                readOnly
              />
              <label>UPN</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={profileData.post_held}
                readOnly
              />
              <label>Post Held</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={"Cool FM"}
                readOnly
              />
              <label>Station</label>
            </div>
          </div>
        </form>
      </div>

      <div className={`${profileView.profile_section_two}`}>
        <form
          className={`${profileView.personal_info} ${profileView.profile_card}`}
        >
          <legend>
            Personal Information
            <div onClick={handleEditClick}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className={header.notification}
              />
            </div>
          </legend>

          <div className={`${profileView.form_group_wrapper}`}>
            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={profileData.name}
                readOnly
              />
              <label>Full Name</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={broadcaster.email}
                readOnly
              />
              <label>Email Address</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={profileData.state_of_origin}
                readOnly
              />
              <label>State of Origin</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={profileData.local_government}
                readOnly
              />
              <label>Local Government</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={
                  profileData.date_of_birth &&
                  profileData.date_of_birth.split("T")[0]
                }
                readOnly
              />
              <label>Date of Birth</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <textarea
                id="fullName"
                placeholder=""
                required
                defaultValue={profileData.educational_background}
                rows={5}
                cols={30}
                maxLength={150}
                readOnly
              />
              <label>Educational Background</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePageView;
