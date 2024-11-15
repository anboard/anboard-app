import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from "../styles/register.module.css"
import config from "../config"



const RegistrationPage: React.FC = () => {
    const [upn, setUpn] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [registrationToken, setRegistrationToken] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token') as string
        setRegistrationToken(token)
    }, [])
    

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
    
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
    
        try {
            const response = await fetch(`${config.AUTH_BASE_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    upn,
                    email,
                    password,
                    token: registrationToken
                })
            })
    
            const data = await response.json()
    
            if (data.status === 'success') {
                navigate('/auth/login')
            } else if (data.status === 'error') {
                setError('Link expired')
            } else {
                setError(data.error[0].msg)
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        }
    }
    
    
    
    return (
        <div className={styles.registrationpage}>
            <header className={styles.headermain}>
                <h1>Welcome to ANBOARD</h1>
            </header>
            <div className={styles.registrationcontainer}>
                <img src="/images/logo.png" alt="ANBOARD Logo" />
                <h2>Register your account</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <div className={styles.formgroup}>
                        <label htmlFor="upn">UPN</label>
                        <input
                            type="text"
                            id="upn"
                            required
                            value={upn}
                            onChange={(e) => setUpn(e.target.value)}
                        />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles.errormessage}>{error}</p>}
                    <button type="submit" className={styles.submitbutton}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage
