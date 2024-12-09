import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import config from "../config";
import styles from "../styles/adminaccount.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Using FontAwesome for the icon
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const AdminAccount: React.FC = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State for current password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility

  const { accessToken } = useAuth();
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!password || !newPassword) {
      setMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.API_ADMIN_URL}/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password, newPassword }),
      });

      if (response.ok) {
        setMessage("Password changed successfully!");
        setPassword("");
        setNewPassword("");
      }else{
        const error = await response.json();
        setMessage(error.error);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Account</h1>
      <form className={styles.form} onSubmit={handlePasswordChange}>
        {/* Current Password Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Current Password
          </label>
          <div className={styles.inputWrapper}>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter current password"
            />
            <span
              className={styles.icon}
              onClick={() => setShowCurrentPassword((prev) => !prev)}
            >
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEyeSlash : faEye}
              />
            </span>
          </div>
        </div>

        {/* New Password Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            New Password
          </label>
          <div className={styles.inputWrapper}>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <span
              className={styles.icon}
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Changing Password..." : "Change Password"}
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <p
          aria-live="polite"
          className={`${styles.message} ${
            message.toLowerCase().includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminAccount;
