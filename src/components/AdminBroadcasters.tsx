import React, { useEffect, useState } from "react";
import config from "../config";
import { useAuth } from "../AuthContext";
import styles from "../styles/adminbroadcasters.module.css";

interface Broadcaster {
  id: number; // Match the API's `id` type
  upn: string;
  name: string | null; // Handle `null` for name
  post_held: string | null; // Handle `null` for post
  pfpUrl: string; // Picture URL
}

const AdminBroadcasters: React.FC = () => {
  const [broadcasters, setBroadcasters] = useState<Broadcaster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { accessToken } = useAuth();

  // Fetch broadcasters from API
  const fetchBroadcasters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.API_ADMIN_URL}/broadcasters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch broadcasters.");
      }

      const data = await response.json();
      setBroadcasters(data.members || []); // Use `members` from the API response
      setError("");
    } catch (err: any) {
      console.error("Error fetching broadcasters:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Delete broadcaster
  const deleteBroadcaster = async (upn: string) => {
    if (!window.confirm("Are you sure you want to delete this broadcaster?")) {
      return;
    }

    try {
      const response = await fetch(`${config.API_ADMIN_URL}/broadcaster`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ upn }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete broadcaster.");
      }

      // Update UI after successful deletion
      setBroadcasters((prev) => prev.filter((broadcaster) => broadcaster.upn !== upn));
      alert("Broadcaster deleted successfully.");
    } catch (err: any) {
      console.error("Error deleting broadcaster:", err);
      alert("Failed to delete broadcaster. Please try again.");
    }
  };

  // Fetch broadcasters on component mount
  useEffect(() => {
    fetchBroadcasters();
  }, []);

  if (loading) {
    return <p>Loading broadcasters...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Broadcasters</h1>
      {broadcasters.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Picture</th>
              <th>UPN</th>
              <th>Name</th>
              <th>Post Held</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {broadcasters.map((broadcaster) => (
              <tr key={broadcaster.id}>
                <td>
                  <img
                    src={broadcaster.pfpUrl || "/default-avatar.png"}
                    alt={broadcaster.name || "Broadcaster"}
                    className={styles.picture}
                  />
                </td>
                <td>{broadcaster.upn}</td>
                <td>{broadcaster.name || "N/A"}</td>
                <td>{broadcaster.post_held || "N/A"}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteBroadcaster(broadcaster.upn)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No broadcasters found.</p>
      )}
    </div>
  );
};

export default AdminBroadcasters;
