import videoUploader from "../styles/videoUploader.module.css";

const VideoPreviewer: React.FC<{ videoFile: File }> = ({ videoFile }) => {
  return (
    <video
      className={videoUploader.thumbnail}
      controls
      key={URL.createObjectURL(videoFile)}
    >
      <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPreviewer;
