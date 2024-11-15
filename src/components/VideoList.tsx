import React, { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { useAuth } from "../AuthContext"
import Ivideo from '../interface/IVideo'
import config from '../config'
import { useNavigate } from 'react-router-dom'


const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Ivideo[]>([])
    const [loading, setLoading] = useState(true)
    const { accessToken } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/videos`, {
                    method: 'GET',
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

                const { videos } = await response.json()
                console.log(videos)
                setVideos(videos)
                setLoading(false)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        
        fetchVideos()
    }, [])

    if (loading) return <div>Loading...</div>
    // if (error) return <div>Error: {error}</div>

    return (
        <div>
            <div>
                <h1>Videos</h1>
                <button type="button" onClick={() => navigate('/api/anb-broadcaster/videos/upload')}>+ add video</button>
            </div>
            <ul>
                {videos.map(video => (
                    <li key={video.filename}>
                        {/* <VideoItem video={video} /> */}
                        <VideoPlayer video={video} />
                    </li>
                ))}
            </ul>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}


export default VideoList
