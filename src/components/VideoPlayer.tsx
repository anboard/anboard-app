import React, { useEffect, useRef } from 'react'
import config from '../config'
import Ivideo from '../interface/IVideo'

const VideoPlayer: React.FC<{ video: Ivideo }> = ({ video }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    // const { filename } = useParams()

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = `${config.API_BASE_URL}/videos/stream?filename=${video.filename}`
        }
    }, [video.filename])

    return (

        <div>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <video ref={videoRef} controls width='320' height='240'>
                <source src={`${config.API_BASE_URL}/videos/stream?filename=${video.filename}`} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
        </div>

        // <div>
        //     <video ref={videoRef} controls width='320' height='240'>
        //         <source src={`${config.API_BASE_URL}/videos/stream/${video.filename}`} type='video/mp4' />
        //         Your browser does not support the video tag.
        //     </video>
        // </div>
    )
// const VideoPlayer: React.FC = () => {
//     const videoRef = useRef<HTMLVideoElement>(null)
//     const { filename } = useParams()

//     useEffect(() => {
//         if (videoRef.current) {
//             videoRef.current.src = `${config.API_BASE_URL}/videos/stream/${filename}`
//         }
//     }, [filename])

//     return (
//         <div>
//             <video ref={videoRef} controls width='320' height='240'>
//                 <source src={`${config.API_BASE_URL}/videos/stream/${filename}`} type='video/mp4' />
//                 Your browser does not support the video tag.
//             </video>
//         </div>
//     )
}

export default VideoPlayer