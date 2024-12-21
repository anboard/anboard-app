import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../AuthContext";
import IProfile from "../interface/IProfile";
import config from "../config";
import profileView from "../styles/profilView.module.css";
import layout from "../styles/layout.module.css";
import { useOutletContext } from "react-router-dom";
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import IBroadcast from "../interface/IBroadcast";

const MIN_DIMENSION = 200;
const ASPECT_RATIO = 1;

interface LayoutContext {
  pfpLink: string;
  setPfpLink: React.Dispatch<React.SetStateAction<string>>;
  profileData: IProfile;
  stationData: IBroadcast;
  broadcaster: { upn: string; email: string };
  menuOpen: boolean;
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePageEdit: React.FC<{
  updateProfileData: any;
  handleCancel: () => void;
  setIsEditing: any;
}> = ({ updateProfileData, handleCancel, setIsEditing }) => {
  const {
    pfpLink,
    setPfpLink,
    broadcaster,
    profileData,
    menuOpen,
    setOverlay,
    stationData,
  }: LayoutContext = useOutletContext();

  // PROFILE DATA STATES
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
  const [postHeld, setPostHeld] = useState(profileData.post_held || "");
  const [educationalBackground, setEducationalBackground] = useState(
    profileData.educational_background || ""
  );

  // PROFILE PHOT STATES
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or 'px'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  // STATES FOR MANAGING SAVE STATES
  const { accessToken } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pfpIsSaving, setPfpIsSaving] = useState(false);

  const handleInputChange = (
    setter: (value: string) => void,
    key: string,
    value: string
  ) => {
    setter(value);
    updateProfileData({ ...profileData, [key]: value });
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<any>(null);

  const handlePfpSave = async () => {
    if (!photoFile) {
      return;
    }

    setPfpIsSaving(true);
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
        setPfpLink(pfpUrl);
      } else {
        const errorMessage = await response.text();
        console.error(`Error: ${response.status} - ${errorMessage}`);
        throw new Error("Failed to save profile picture.");
      }
    } catch (error) {
      console.error("Error saving profile picture:", error);
      alert("Failed to save profile picture.");
    } finally {
      setPfpIsSaving(false);
      setImageSrc("");
      setCroppedImageUrl(null);
      setOverlay(false);
    }
  };

  const handlePfpRemove = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/profile/photo`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setPfpLink("");
        localStorage.removeItem("pfpLink");
        console.log("pfp removed");
      } else {
        const errorMessage = await response.text();
        console.error(`Error: ${response.status} - ${errorMessage}`);
        throw new Error("Failed to remove profile picture.");
      }
    } catch (error) {
      console.error("Error removing profile picture:", error);
      alert("Failed to remove profile picture.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      console.log(profileData);
      delete profileData?.upn;
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

  // EFFECT TO SET CROP MAX WIDTH
  useEffect(() => {
    const updateMaxWidth = () => {
      const containerWidth =
        document.querySelector(".crop_buddy")?.clientWidth || 0;
      setMaxWidth(containerWidth * 0.8); // 80% of the container width in pixels
    };

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);

    return () => {
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, [imageSrc]);

  const toggleDropdown = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    event.stopPropagation();

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  const handleFilesSelected = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setPhotoFile(file);

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageUrl = reader.result?.toString() || "";
        setImageSrc(imageUrl);
        setPfpLink(imageUrl)
      });

      reader.readAsDataURL(file);
      setOverlay(true);
    } else {
    }
  };

  const handleUploadPicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFilesSelected(files);
  };

  const onImageLoad = (e: any) => {
    const { width, height } = e.currentTarget;
    const naturalWidth = e.currentTarget.naturalWidth;
    const naturalHeight = e.currentTarget.naturalHeight;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: MIN_DIMENSION,
      },
      ASPECT_RATIO,
      naturalWidth,
      naturalHeight
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const getCroppedImage = () => {
    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  };

  const handleCropComplete = async () => {
    if (crop.width && crop.height) {
      const croppedImage = await getCroppedImage();
      if (croppedImage) {
        const file = new File([croppedImage as string], "pfp.png", {
          type: "image/png",
        });
        const url = URL.createObjectURL(file);
        setCroppedImageUrl(url as string);
        setPhotoFile(file);
      }
    }
  };

  return (
    <div
      className={`${profileView.profile_container} ${
        menuOpen ? profileView.single_grid : ""
      }`}
    >
      {imageSrc && (
        <div className={`${profileView.crop_container}`}>
          <div className={`${profileView.crop_top}`}>
            Crop your new profile picture
            <div
              className={`${profileView.crop_close}`}
              onClick={() => {
                setImageSrc("");
                setCroppedImageUrl(null);
                setOverlay(false);
                setPfpLink('');
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>

          <div className={`${profileView.crop_body} crop_buddy`}>
            <ReactCrop
              crop={crop}
              circularCrop
              keepSelection
              aspect={1}
              minWidth={50}
              maxWidth={maxWidth}
              onChange={(pixelCrop, _percentCrop) => {
                setCrop(pixelCrop);
              }}
              onComplete={handleCropComplete}
              className={`${profileView.crop}`}
            >
              <img
                src={imageSrc}
                ref={imageRef}
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>

          <div className={`${profileView.crop_bottom}`}>
            <div onClick={handlePfpSave}>{
              pfpIsSaving ? "Saving profile picture..." : "Save profile picture"
              }</div>
          </div>
        </div>
      )}

      <div className={`${profileView.profile_section_one}`}>
        <div className={`${profileView.section_one_head}`}>
          <div className={`${profileView.profile_picture_wrapper}`}>
            <img
              src={croppedImageUrl ?? pfpLink}
              alt="Profile"
              className={`${profileView.profile_pic}`}
            />
            <div className={`${profileView.profile_pic_edit_wrapper}`}>
              <div
                className={`${profileView.profile_pic_edit} ${layout.clickable}`}
                onClick={toggleDropdown}
              >
                <FontAwesomeIcon icon={faPencil} />
              </div>
              <div>
                <div className={`${profileView.dropdown}`} ref={dropdownRef}>
                  {dropdownOpen && (
                    <div>
                      <div className={`${profileView.dropdown_point}`}></div>
                      <ul>
                        <li
                          onClick={handleUploadPicClick}
                          className={`${layout.clickable}`}
                        >
                          Upload a photo...
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </li>
                        <li
                          onClick={handlePfpRemove}
                          className={`${layout.clickable}`}
                        >
                          Remove photo
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
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
                defaultValue={postHeld}
                onChange={(e) => {
                  handleInputChange(setPostHeld, "post_held", e.target.value);
                }}
              />
              <label>Post Held</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={stationData.station_name}
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
          onSubmit={handleSubmit}
        >
          <legend>Personal Information</legend>

          <div className={`${profileView.form_group_wrapper}`}>
            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={name}
                onChange={(e) =>
                  handleInputChange(setName, "name", e.target.value)
                }
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
                defaultValue={stateOfOrigin}
                onChange={(e) => {
                  handleInputChange(
                    setStateOfOrigin,
                    "state_of_origin",
                    e.target.value
                  );
                }}
              />
              <label>State of Origin</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="text"
                id="fullName"
                placeholder=""
                required
                defaultValue={localGovernment}
                onChange={(e) =>
                  handleInputChange(
                    setLocalGovernment,
                    "local_government",
                    e.target.value
                  )
                }
              />
              <label>Local Government</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <input
                type="date"
                id="fullName"
                placeholder=""
                required
                defaultValue={dateOfBirth.split("T")[0]}
                onChange={(e) =>
                  handleInputChange(
                    setDateOfBirth,
                    "date_of_birth",
                    e.target.value
                  )
                }
              />
              <label>Date of Birth</label>
            </div>

            <div className={`${profileView.form_group}`}>
              <textarea
                id="fullName"
                placeholder=""
                required
                defaultValue={educationalBackground}
                rows={5}
                cols={30}
                maxLength={150}
                onChange={(e) =>
                  handleInputChange(
                    setEducationalBackground,
                    "educational_background",
                    e.target.value
                  )
                }
              />
              <label>Educational Background</label>
            </div>
          </div>

          <div className={profileView.form_controls}>
            <button type="submit" disabled={isSaved}>
              {isSaving ? "Saving profile" : "Save profile"}
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            {isSaved && (
              <p style={{ color: "green" }}>Saved Profile successfully</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePageEdit;
