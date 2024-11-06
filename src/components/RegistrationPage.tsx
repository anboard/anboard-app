import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

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
            
            const response = await fetch('http://localhost:3000/auth/register/', {
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
            } else {
                console.log(response)
            }
        } catch (error) {

            setError('An error occurred. Please try again.')
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <label>UPN</label>
                    <input 
                        type="text"
                        value={upn} 
                        onChange={(e) => setUpn(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{backgroundColor: 'red'}}>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegistrationPage