import videoUploader from "../styles/uploader.module.css";

const Previewer: React.FC<{ file: File, type: string }> = ({ file }) => {
  return (
    <video
      className={videoUploader.thumbnail}
      controls
      key={URL.createObjectURL(file)}
    >
      <source src={URL.createObjectURL(file)} type={file.type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Previewer;
