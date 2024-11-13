import React, { useEffect, useState } from "react"
import { useAuth } from "../AuthContext"
import config from '../config'
import { Link } from 'react-router-dom' // Import the Link component
import { useNavigate } from "react-router-dom"
// import "../styles/login.css"

const DashboardPage: React.FC = () => {
    const [broadcaster, setBroadcaster] = useState<{upn: string, email: string}>({upn: '', email: ''})
    const [loading, setLoading] = useState(true)
    const { accessToken, logout } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchData = async () => {
            try {

                
                setLoading(true)
                const response = await fetch(`${config.API_BASE_URL}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const error = await response.json()
                    setError(error.error)
                    return 
                }

                const { broadcaster } = await response.json()
                setBroadcaster(broadcaster)

            } catch (error: any) {
                setError(error.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="">Welcome, {broadcaster.upn}</div>
            <br /><br /><br />
        <Link to="/api/anb-broadcaster/profile">
                <button type="button">Set up your Profile</button>
        </Link>
            <button type="button" onClick={() => navigate('/api/anb-broadcaster/videos')}>Videos</button>
            <button type="button" onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default DashboardPage