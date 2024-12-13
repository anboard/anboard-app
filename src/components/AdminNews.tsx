import React from "react";
import styles from "../styles/adminnews.module.css";
import config from "../config";
import { useAuth } from "../AuthContext";

const AdminNews: React.FC = () => {
  const { accessToken } = useAuth();
  // Use the accessToken
  accessToken;
  const sanityLink = `${config.API_ADMIN_SANITY}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin News</h1>
      <p className={styles.description}>
        Manage and post news articles for the website using Sanity CMS. Click the button below to access the Sanity dashboard.
      </p>
      <a href={sanityLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Go to Sanity Dashboard
      </a>
    </div>
  );
};

export default AdminNews;
