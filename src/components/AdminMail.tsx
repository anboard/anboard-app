import { useState } from "react";
import config from "../config";
import styles from "../styles/adminmail.module.css";

const AdminMail: React.FC = () => {
    const [upn, setUpn] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleAdminMailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${config.API_ADMIN_URL}/mail/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    upn,
                    email,
                }),
            });

            const message = await response.json();
            if (message.status === "conflictError") {
                setError(message.error);
                return;
            }

            if (!response.ok) {
                setError("An error occurred while sending the mail.");
                return;
            }

            setSuccess(message.success);
        } catch (error) {
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2>Admin Mail</h2>
                <form onSubmit={handleAdminMailSubmit} className={styles.form}>
                    <label htmlFor="upn">Enter UPN</label>
                    <input
                        type="text"
                        name="upn"
                        id="upn"
                        placeholder="Enter the member UPN"
                        value={upn}
                        onChange={(e) => setUpn(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Enter Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter the member email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {success && <p className={styles.successMessage}>{success}</p>}

                    <button type="submit" className={styles.submitButton}>
                        Send Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminMail;
