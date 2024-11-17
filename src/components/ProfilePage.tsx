import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../AuthContext'
import config from '../config'
import ProfilePageView from './ProfilePageView'
import IProfile from '../interface/IProfile'
import EditProfileForm from './ProfilePageEdit'
import { useOutletContext } from 'react-router-dom'
import Ivideo from '../interface/IVideo'

interface LayoutContext {
  //   userData: { name: string; email: string } | null;
    videos: Ivideo[];
    pfpLink: string
    setPfpLink: any
}

const NProfilePage: React.FC<{
    // pfpLink: string;
    // setPfpLink: any
}> = ({
    // pfpLink,
    // setPfpLink
}) => {
    const { accessToken, logout } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const originalProfileDataRef = useRef<IProfile>({} as IProfile)
    const [profileData, setProfileData] = useState<IProfile>({} as IProfile as any)

  const { pfpLink, setPfpLink }: LayoutContext = useOutletContext();


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/profile`, {
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

                const data = await response.json()
                const broadcasterProfile = data.data
                setProfileData(broadcasterProfile)
                setLoading(false)
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    const updateProfileData = (updatedFields: any) => {
        setProfileData((prevData) => ({
            ...prevData,
            ...updatedFields
        }))

    }

    const handleEditClick = () => {
        originalProfileDataRef.current = profileData
        setIsEditing(!isEditing)
      }
      
      const handleCancel = () => {
        setProfileData(originalProfileDataRef.current)
        setIsEditing(false)
      }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            { 
                !isEditing
                ?
                <div>
                    <ProfilePageView {...profileData}/>
                    <button type="button" onClick={handleEditClick}>Edit</button>
                    <button type="button" onClick={() => logout()}>Logout</button>
                    
                </div>
                :
                <EditProfileForm profileData={profileData} updateProfileData={updateProfileData} handleCancel={handleCancel} setIsEditing={setIsEditing} pfpLink={pfpLink} setPfpLink={setPfpLink} />
            }            
        </div>
    )
}
export default NProfilePage