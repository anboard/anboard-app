import React, { useEffect, useState } from 'react'
import VideoItem from './VideoItem'
import { useAuth } from "../AuthContext"
import Ivideo from '../interface/IVideo'
import config from '../config'


const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Ivideo[]>([])
    const [loading, setLoading] = useState(true)
    const { accessToken } = useAuth()
    const [error, setError] = useState(null)

    console.log(accessToken)

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
                    throw new Error('Failed to fetch videos')
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
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h1>Videos</h1>
            <ul>
                {videos.map(video => (
                    <li key={video.filename}>
                        <VideoItem video={video} />
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default VideoList
