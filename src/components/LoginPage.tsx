import React, { useState } from "react"
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"
import config from "../config"

interface ResponseData {
    status: string
    data: {
        accessToken: string
    }
}

const LoginPage: React.FC = () => {
    const [upn, setUpn] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { setAccessToken } = useAuth()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    console.log(config.API_BASE_URL)

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
            navigate("/api/anb-broadcaster/dashboard")

        } catch (error) {
            setError("Login failed. Please check your credentials and try again.")
            console.error(error)
        }
    }

    return (
        <div className="login-page">
            <header className="login-header">
                <h1>Welcome to ANBOARD</h1>
            </header>

            <main className="login-content">
                <img src="../images/logo.png" alt="ANBOARD logo" className="logo" />
                <h2>Welcome back!</h2>
                <form onSubmit={handleLoginSubmit} className="login-form">
                    <label htmlFor="upn">Enter UPN</label>
                    <input
                        type="text"
                        id="upn"
                        required
                        className="login-input"
                        onChange={(e) => setUpn(e.target.value)}
                    />
                    <label htmlFor="password">Enter Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        className="login-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">Log in</button>
                </form>
            </main>
        </div>
    )
}

export default LoginPage
