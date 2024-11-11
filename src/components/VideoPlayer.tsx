import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import config from '../config'

const VideoPlayer: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const { filename } = useParams()

    console.log(filename)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = `${config.API_BASE_URL}/videos/stream/${filename}`
        }
    }, [filename])

    return (
        <div>
            <video ref={videoRef} controls width='320' height='240'>
                <source src={`${config.API_BASE_URL}/videos/stream/${filename}`} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default VideoPlayer