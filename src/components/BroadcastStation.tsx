import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../AuthContext'
import BroadcastStationView from './BroadcastStationView'
import IBroadcast from '../interface/IBroadcast'
import EditBroadcastStation from './BroadcastStationEdit'
import { useOutletContext } from 'react-router-dom'
import Ivideo from '../interface/IVideo'

interface LayoutContext {
  //   userData: { name: string; email: string } | null;
    videos: Ivideo[];
    pfpLink: string;
    setPfpLink: any;
}


const NBroadcastStation: React.FC<{
    // pfpLink: string;
    // setPfpLink: any
}> = ({
    // pfpLink,
    // setPfpLink
}) => {
    const { logout } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const originalBroadcastStationRef = useRef<IBroadcast>({} as IBroadcast)
    const [broadcastdata, setbroadcastdata] = useState<IBroadcast>({} as IBroadcast as any)

  const { pfpLink, setPfpLink }: LayoutContext = useOutletContext();


    useEffect(() => {
        const fetchBroadcastdata = async () => {
            try {
            //     const response = await fetch(`${config.API_BASE_URL}/broadcaststation`, {
            //         method: 'GET',
            //         headers: {
            //             'Authorization': `Bearer ${accessToken}`,
            //             'Content-Type': 'application/json'
            //         }
            //     })

            //     if (!response.ok) {
            //         const error = await response.json()
            //         setError(error.error)
            //         throw new Error(`HTTP error! status: ${response.status}`);
            //         return 
            //     }

            //     const data = await response.json()
            //     const broadcasterStation = data.data
            //     setbroadcastdata(broadcasterStation)
                setLoading(false)
            } catch (error: any) {
                setError(error.message)
                console.error('Error fetching broadcast data:', error);

            } finally {
                setLoading(false)
            }
        }

        fetchBroadcastdata()
    }, [])

    const updatebroadcastdata = (updatedFields: any) => {
        setbroadcastdata((prevData) => ({
            ...prevData,
            ...updatedFields
        }))

    }

    const handleEditClick = () => {
        originalBroadcastStationRef.current = broadcastdata
        setIsEditing(!isEditing)
      }
      
      const handleCancel = () => {
        setbroadcastdata(originalBroadcastStationRef.current)
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
                    <BroadcastStationView broadcastdata= {broadcastdata}/>
                    <button type="button" onClick={handleEditClick}>Edit</button>
                    <button type="button" onClick={() => logout()}>Logout</button>
                    
                </div>
                :
                <EditBroadcastStation broadcastdata ={broadcastdata} updatebroadcastdata={updatebroadcastdata} handleCancel={handleCancel} setIsEditing={setIsEditing} pfpLink={pfpLink} setPfpLink={setPfpLink} />
            }            
        </div>
    )
}
export default NBroadcastStation
