import { useState } from "react";
import config from "../config";
import styles from "../styles/admindashboard.module.css";


const AdminDashboard: React.FC = () => {
    // const [error, setError] = useState<string>("");
    // const [success, setSuccess] = useState<string>("");

    // const handleAdminMailSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setError("");
    //     setSuccess("");
    //     try {
    //         const response = await fetch(`${config.API_ADMIN_URL}/mail/`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 // upn,
    //                 // email,  
    //             }),
    //         });
    //     } catch (error) {
    //         setError("Something went wrong. Please try again later.");
    //     }

        return (
            <div>
                <h1>Admin Dashboard</h1>            
            </div>
        );

// }
}
export default AdminDashboard;


