import Ivideo from "../interface/IVideo";
import { useNavigate } from "react-router-dom"

const VideoItem: React.FC<{ video: Ivideo }> = ({ video }) => {
    const navigate = useNavigate()

    return (
        <div>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <button onClick={() => navigate(`/api/videos/stream/${video.filename}`)}>
                Watch Video
            </button>
        </div>
    );
};

export default VideoItem