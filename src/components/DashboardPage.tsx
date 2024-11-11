import React, { useEffect, useState } from "react"
import { useAuth } from "../AuthContext"
import config from '../config'
import { useNavigate } from "react-router-dom"
// import "../styles/login.css"

const DashboardPage: React.FC = () => {
    const [broadcaster, setBroadcaster] = useState<{upn: string, email: string}>({upn: '', email: ''})
    const [loading, setLoading] = useState(true)
    const { accessToken, setAccessToken } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {

        if (!accessToken) {
            // setError('No access token found.');
            // setLoading(false);
            // return;

            setAccessToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cG4iOiIyNDY4MTAiLCJlbWFpbCI6ImRvbmJhcml6YWFAZ21haWwuY29tIiwiaWF0IjoxNzMwOTI3NjkzLCJleHAiOjE3MzA5MzEyMzN9.QSJWUL5glyFcEVCZVUNNAh19jR0SUsCM9QgtvXvM5jg`)
        }

        const fetchData = async () => {
            try {

                let testAccess = accessToken || `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cG4iOiIyNDY4MTAiLCJlbWFpbCI6ImRvbmJhcml6YWFAZ21haWwuY29tIiwiaWF0IjoxNzMwOTI3ODY5LCJleHAiOjE3MzA5MzE0MDl9.Xt_ZthGPDvcwqHU-Dt983-IoCI8OSO7_O3WmHnboFxQ`
                setLoading(true)
                const response = await fetch(`${config.API_BASE_URL}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${testAccess}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const error = await response.json()
                    setError(error.error)
                    console.log(error.error)
                    return 
                }

                const { broadcaster } = await response.json()
                setBroadcaster(broadcaster)
                console.log(broadcaster)

            } catch (error: any) {
                setError(error.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [accessToken])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="">Welcome, {broadcaster.upn}</div>
            <button type="button" onClick={() => navigate('/api/anb-broadcaster/videos')}>Videos</button>
        </div>
    )
}

export default DashboardPage