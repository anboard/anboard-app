import React, { useRef } from "react";
import videoList from "../styles/videoList.module.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
// import { useNavigate } from "react-router-dom";

interface FilePickerProps {
  onFilesSelected: (files: FileList | null) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onFilesSelected }) => {
  // Use a ref to reference the hidden file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const navigate = useNavigate();

  // Function to trigger the file input click
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simulate click on the hidden input
    }
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    onFilesSelected(files); // Pass selected files to parent component
  };

  return (
    <div className={`${videoList.upload_card}`} onClick={handleDivClick}>
      <div className={`${videoList.upload_card_icon_wrapper}`}>
        <UploadFileIcon sx={{ fontSize: 16 }} />
      </div>
      <p>
        <span className={`${videoList.highlight}`}>Upload</span> from device
      </p>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="video/*"
      />
    </div>
  );
};

export default FilePicker;
