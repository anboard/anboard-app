import React, { useState } from 'react'
import config from '../config'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

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

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        setVideoFile(event.target.files[0])
      }
  }

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
        setUploaded(true)
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

  return (
    <div>
      <h1>Upload Video</h1>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <label>
          Video File:
          <input type="file" accept="video/*" onChange={handleVideoFileChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {uploaded && <p style={{ color: 'green' }}>Video uploaded successfully</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default VideoUploader