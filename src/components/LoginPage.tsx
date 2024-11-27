import React, { useState } from "react"
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import styles from "../styles/login.module.css"
import config from "../config"

interface ResponseData {
    status: string
    data: {
        accessToken: string,
        refreshToken: string
    }
}

const LoginPage: React.FC = () => {
    const [upn, setUpn] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { setAccessToken, setAuthError } = useAuth()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch(`${config.AUTH_BASE_URL}/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ upn, password }),
            })

            if (!response.ok) throw new Error("Login failed")

            const fetchedData = (await response.json()) as ResponseData
            setAccessToken(fetchedData.data.accessToken)
            setAuthError(false)
            localStorage.setItem('vvvAAA', fetchedData.data.refreshToken)
            navigate("/api/anb-broadcaster/dashboard")

        } catch (error) {
            setError("Login failed. Please check your credentials and try again.")
            console.error(error)
        }
    }

    return (
        <div className={styles.loginpage}>
            <header className={styles.loginheader}>
                <h1>Welcome to ANBOARD</h1>
            </header>

            <main className={styles.logincontent}>
                <img src="../images/logo.png" alt="ANBOARD logo" className={styles.logo} />
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
                    <button type="submit" className={styles.loginbutton}>Log in</button>
                </form>
            </main>
        </div>
    )
}

export default LoginPage
