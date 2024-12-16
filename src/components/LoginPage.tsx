import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import config from "../config";
import {useLocation } from "react-router-dom";

interface ResponseData {
    status: string;
    data: {
        accessToken: string;
        refreshToken: string;
        isAdmin: boolean; // Add isAdmin to the data object
    };
}

const LoginPage: React.FC = () => {
    const [upn, setUpn] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setAccessToken, setAuthError, setRole } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [title, setTitle] = useState("Dashboard");
    title


     // Use React Router's `useLocation` to track the current route
  const location = useLocation();

  // Dynamically update the page and tab title based on the current route
  useEffect(() => {
    const getPageTitle = (): string => {
      switch (location.pathname) {
        case "/auth/login":
          return "Login";
        default:
          return " Anboard"; // Default fallback title
      }
    };

    const newTitle = getPageTitle();
    setTitle(newTitle); // Set the internal state (optional)
    document.title = newTitle; // Dynamically update the browser tab title
  }, [location.pathname]); // Run when the route changes


    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous error

        try {
            // Check if the user is an admin
            const isAdmin = upn === "admin";

            // Determine the login endpoint based on the user type
            const loginEndpoint = isAdmin
                ? `${config.AUTH_BASE_URL}/login/`
                : `${config.AUTH_BASE_URL}/login/`;

            const response = await fetch(loginEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ upn, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const fetchedData = (await response.json()) as ResponseData;

            // Set tokens and role, then redirect
            setAccessToken(fetchedData.data.accessToken);
            setRole(isAdmin ? "admin" : "broadcaster"); // Set role
            setAuthError(false);
            localStorage.setItem("vvvAAA", fetchedData.data.refreshToken);

            // Redirect based on user type
            if (isAdmin) {
                navigate("/api/admin/dashboard");
            } else {
                navigate("/api/anb-broadcaster/dashboard");
            }

        } catch (err) {
            setError("Login failed. Please check your credentials and try again.");
            console.error(err);
        }
    };

    return (
        <div className={styles.loginpage}>
            <header className={styles.loginheader}>
                <h1>Welcome to ANBOARD</h1>
            </header>

            <main className={styles.logincontent}>
                <img
                    src="../images/logo.png"
                    alt="ANBOARD logo"
                    className={styles.logo}
                />
                <h2>Welcome back!</h2>
                <form onSubmit={handleLoginSubmit} className={styles.loginform}>
                    <label htmlFor="upn">Enter UPN</label>
                    <input
                        type="text"
                        id="upn"
                        required
                        className={styles.logininput}
                        onChange={(e) => setUpn(e.target.value)}
                    />
                    <label htmlFor="password">Enter Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        className={styles.logininput}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className={styles.errormessage}>{error}</p>}
                    <button type="submit" className={styles.loginbutton}>
                        Log in
                    </button>
                </form>
            </main>
        </div>
    );
};

export default LoginPage;
