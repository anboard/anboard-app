import React from "react";
import styles from "../styles/adminannouncement.module.css";

const AdminAnnouncement: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Announcement</h1>
      <p className={styles.description}>
        Use the link below to access the Sanity dashboard where you can post new announcements for all broadcasters. 
        These announcements will be displayed on their dashboard once published.
      </p>
      <div className={styles.linkContainer}>
        <a 
          href="https://your-sanity-dashboard-url.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          Go to Sanity Dashboard
        </a>
      </div>
    </div>
  );
};

export default AdminAnnouncement;
