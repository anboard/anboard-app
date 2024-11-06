import React, { useState } from "react"
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom"

interface ResponseData {
    status: string,
    data: {
        accessToken: string
    }
}

const LoginPage: React.FC = () => {

    const [upn, setUpn] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { setAccessToken } = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()
 
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch('http://localhost:3000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    upn,
                    password      
                })
            })

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const fetchedData = await response.json() as ResponseData

            setAccessToken(fetchedData.data.accessToken)
            navigate('/api/anb-broadcaster/dashboard')
            return

        } catch (error) {
            setError('Login failed. Please check your credentials and try again.')
            console.error(error)
        }
    }

    return (
        <form action="post" onSubmit={handleLoginSubmit}>
            <label htmlFor="upn">Enter upn</label>
            <input type="text" name="upn" id="upn" onChange={(e) => {setUpn(e.target.value)}} />

            <label htmlFor="password">Enter password</label>
            <input type="text" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}} />

            {error && <p style={{backgroundColor: 'red'}}>{error}</p>}
            <button type="submit" >Log in</button>
        </form>
    )
}

export default LoginPage