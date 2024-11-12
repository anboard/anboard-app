import React, { useState } from 'react'
import { useAuth } from '../AuthContext'
import IProfile from '../interface/IProfile'
import config from '../config'


const EditProfileForm: React.FC<{ profileData: IProfile, updateProfileData: any, handleCancel: () => void, setIsEditing: any}> = ({ 
    profileData, 
    updateProfileData, 
    handleCancel,
    setIsEditing
}) => {

    const [name, setName] = useState(profileData.name || '')
    const [dateOfBirth, setDateOfBirth] = useState(profileData.date_of_birth || '')
    const [stateOfOrigin, setStateOfOrigin] = useState(profileData.state_of_origin || '')
    const [localGovernment, setLocalGovernment] = useState(profileData.local_government || '')
    const [baseLocation, setBaseLocation] = useState(profileData.base_location || '')
    const [associationChapter, setAssociationChapter] = useState(profileData.association_chapter || '')
    const [postHeld, setPostHeld] = useState(profileData.post_held || '')
    const [radio_shows, setRadioShows] = useState(profileData.radio_shows || [''])
    const [station, setStation] = useState(profileData.station || '')
    const [yearStarted, setYearStarted] = useState(profileData.year_started || '')
    const [educationalBackground, setEducationalBackground] = useState(profileData.educational_background || '')
    const { accessToken } = useAuth()
    const [isSaved, setIsSaved] = useState(false)
    const [isSaving, setIsSaving] = useState(false)


    const handleInputChange = (setter: (value: string) => void, key: string, value: string) => {
        
        setter(value)
        updateProfileData({ ...profileData, [key]: value })
        
    }

    // Update the radio_shows array dynamically
    const handleRadioShowChange = (index: number, value: string) => {
        const updatedRadioShows = [...radio_shows]
        updatedRadioShows[index] = value
        setRadioShows(updatedRadioShows)
        updateProfileData({ ...profileData, radio_shows: updatedRadioShows })
    }

    // Add a new input field for radio shows
    const addRadioShowField = () => {
        setRadioShows([...radio_shows, ''])
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSaving(true)
        console.log(profileData)
        try {

           const response =  await fetch(`${config.API_BASE_URL}/profile`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({profileData})
            })
            
            const data = await response.json()
            
            if (data.status === 'success') {
                setIsSaved(true)
                setIsSaving(false)
                setTimeout(() => {
                    setIsEditing(false)
                }, 2000)
            }
        } catch (error) {
            console.error('Error saving profile data:', error)
            alert('Failed to save profile data.')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* PERSONAL INFORMATION FIELDSET */}
            <fieldset>
                <legend><h2>Personal</h2></legend>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => handleInputChange(setName, 'name', e.target.value)}
                    />
                </div>
                <div>
                    <label>Post Held:</label>
                    <input
                        type="text"
                        value={postHeld}
                        onChange={(e) => handleInputChange(setPostHeld, 'post_held', e.target.value)}
                    />
                </div>
                <div>
                    <label>State of Origin:</label>
                    <input
                        type="text"
                        value={stateOfOrigin}
                        onChange={(e) => handleInputChange(setStateOfOrigin, 'state_of_origin', e.target.value)}
                    />
                </div>
                <div>
                    <label>Local Government:</label>
                    <input
                        type="text"
                        value={localGovernment}
                        onChange={(e) => handleInputChange(setLocalGovernment, 'local_government', e.target.value)}
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => handleInputChange(setDateOfBirth, 'date_of_birth', e.target.value)}
                    />
                </div>
                <div>
                    <label>Educational Background:</label>
                    <textarea
                        value={educationalBackground}
                        onChange={(e) => handleInputChange(setEducationalBackground, 'educational_background', e.target.value)}
                    />
                </div>
            </fieldset>

            {/* BROADCAST STATION FIELDSET */}
            <fieldset>
                <legend><h2>Broadcast Station</h2></legend>
                <div>
                    <label>Station Name:</label>
                    <input
                        type="text"
                        value={station}
                        onChange={(e) => handleInputChange(setStation, 'station', e.target.value)}
                    />
                </div>
                <div>
                    <label>Base Location:</label>
                    <input
                        type="text"
                        value={baseLocation}
                        onChange={(e) => handleInputChange(setBaseLocation, 'base_location', e.target.value)}
                    />
                </div>
                <div>
                    <label>Association Chapter:</label>
                    <input
                        type="text"
                        value={associationChapter}
                        onChange={(e) => handleInputChange(setAssociationChapter, 'association_chapter', e.target.value)}
                    />
                </div>
                <div>
                    <label>Year Started:</label>
                    <input
                        type="number"
                        value={yearStarted}
                        onChange={(e) => handleInputChange(setYearStarted, 'year_started', String(parseInt(e.target.value)) || '')}
                    />
                </div>
                <div>
                    <label>Radio Shows:</label>
                    {radio_shows.map((show, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={show}
                                onChange={(e) => handleRadioShowChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addRadioShowField}>
                        Add Show
                    </button>
                </div>
            </fieldset>
            
            
            
            <button type="submit" disabled={isSaved}>
            {isSaving ? 'Saving profile' : 'Save profile'}
            </button>
            <button type="button" onClick={handleCancel}>Cancel</button>
            {isSaved && <p style={{ color: 'green' }}>Saved Profile successfully</p>}
        </form>

    )
}

export default EditProfileForm
