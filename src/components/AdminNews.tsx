import React from "react";
import styles from "../styles/adminnews.module.css";

const AdminNews: React.FC = () => {
  const sanityLink = "https://your-sanity-dashboard-url"; // Replace with your actual Sanity link

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
