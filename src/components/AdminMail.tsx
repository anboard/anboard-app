import { useState } from "react"

const AdminMail: React.FC = () => {
    const [upn, setUpn] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    
    const handleAdminMailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        
        try {
            
            const response = await fetch('http://localhost:3000/api/admin/mail/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    upn,
                    email      
                })
            })

            const message = await response.json()
            if(message.status === 'conflictError') {
                setError(message.error)
            }

            if (!response.ok) {
                console.log(response)
            }

            setSuccess(message.success)

        } catch (error) {
            
        }
    }

    return (
        <div>
            <form action="post" onSubmit={handleAdminMailSubmit}>
            <label htmlFor="upn">Enter upn</label>
            <input type="text" name="upn" id="upn" onChange={(e) => {setUpn(e.target.value)}} />

            <label htmlFor="email">Enter email</label>
            <input type="email" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}} />

            {error && <p style={{backgroundColor: 'red'}}>{error}</p>}
            <button type="submit" >Send link</button>
        </form>

        {success && <p style={{backgroundColor: 'green'}}>{success}</p>}
        </div>
    )
}

export default AdminMail