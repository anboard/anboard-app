import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import ReactQuill from "react-quill"; // Rich text editor
import styles from "../styles/adminannouncement.module.css"; // Import custom styles

const AdminAnnouncement: React.FC = () => {
  const [announcement, setAnnouncement] = useState<string>("");

  // Handle Send Button
  const handleSend = () => {
    if (!announcement.trim()) {
      alert("Please type your announcement.");
      return;
    }

    // Log announcement (or send to server)
    console.log("Announcement Sent:", announcement);
    alert("Announcement Sent!");
    setAnnouncement(""); // Clear the text editor after sending
  };

  return (
    <div className={styles.container}>
      {/* Center Title */}
      <center>
        <h1 className={styles.title}>Announcement</h1>
      </center>

      {/* Rich Text Editor */}
      <div className={styles.editorContainer}>
        <ReactQuill
          value={announcement}
          onChange={setAnnouncement}
          placeholder="Type your announcement here"
          className={styles.editor}
        />
      </div>

      {/* Send Button */}
      <div className={styles.buttonContainer}>
        <button className={styles.sendButton} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminAnnouncement;
