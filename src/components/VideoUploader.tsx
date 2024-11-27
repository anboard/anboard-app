import React, { useState } from 'react'
import config from '../config'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import videoUploader from '../styles/videoUploader.module.css'
import VideoFilePicker from "./VideoFilePicker";


const VideoUploader: React.FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const { accessToken } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }
  
  // const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   if (event.target.files && event.target.files.length > 0) {
      //       setVideoFile(event.target.files[0])
      //     }
      // }
      
      const handleUpload = async () => {
        if (!videoFile) {
          setError('Please select a video file')
          return
        }

    setUploading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('video', videoFile)

    try {
      const response = await fetch(`${config.API_BASE_URL}/videos/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    })

    const data = await response.json()

      if (data.status === 'success') {
        setError(null)
        setUploading(false)
        setUploaded(true);

        setVideoFile(null)

        setTimeout(() => {
            navigate('/api/anb-broadcaster/videos')
        }, 2000)
      } else {
        setError(data.error)
      }
      
    } catch (error: any) {
      setError(error.message)
      setUploading(false)
    }
  }

  const handleFilesSelected = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      console.log("Selected file:", file);
      setVideoFile(file);
      setError(null);
    } else {
      console.log("No files selected");
    }
  };

console.log("Video file in state:", videoFile);

  return (
    <div className={`${videoUploader.container}`}>
      <h1>Upload Video</h1>

      {/* <div className={`${videoUploader.video_preview}`}>
  {videoFile ? (
    <video className={videoUploader.thumbnail} controls>
      <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
      Your browser does not support the video tag.
    </video>
  ) : (
    <p>No video selected</p> // This is your default state when no file is uploaded
  )}
</div> */}


      <form className={`${videoUploader.form}`}>
        <div className={`${videoUploader.form_group}`}>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className={`${videoUploader.form_group}`}>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <div className={`${videoUploader.form_group}`}>
          <label>Video File:</label>
          {/* <input
              type="file"
              accept="video/*"
              onChange={handleVideoFileChange}
            /> */}
          <VideoFilePicker onFilesSelected={handleFilesSelected} />
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className={`${videoUploader.submit_button}`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploaded && (
          <p style={{ color: "green" }}>Video uploaded successfully</p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default VideoUploader