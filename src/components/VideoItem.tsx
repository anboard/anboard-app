import Ivideo from "../interface/IVideo";
import { useNavigate } from "react-router-dom"

const VideoItem: React.FC<{ video: Ivideo }> = ({ video }) => {
    const navigate = useNavigate()

    return (
        <div>
            <h2>{video.videoname}</h2>
            <p>{video.description}</p>
            <button onClick={() => navigate(`/api/anb-broadcaster/videos/stream/${video.filename}`)}>
                Watch Video
            </button>
        </div>
    );
};

export default VideoItem