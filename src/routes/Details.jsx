import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Details() {
    const { id } = useParams() 

    // Define a state variable to hold photo by id
    const [photo, setHaunt] = useState(null)

    // Get API Url from environment variables
    const apiUrl = import.meta.env.VITE_PHOTOS_API_URL

    // Fetch photo by id from API when component mounts
    useEffect(() => { 
        const getHauntById = async () => { 
            const response = await fetch(`${apiUrl}/${id}`) 
            const result = await response.json()
            
            if(response.ok) { 
                setHaunt(result)
            }
        } 

        getHauntById()
    }, [])


    return (
        <>
            <p><Link to="/">← Back to Home</Link></p>

            <div>
                { haunt && (
                    <>
                        <h2>{haunt.HauntTitle}</h2>
                        <img src={haunt.Filename} alt={photo.PhotoTitle} width="600" />
                    </>
                )}
            </div>

            <h3>Comments</h3>

            <p>Comming soon...</p>

            <p><Link to={`/comment/${id}`}>Add a Comment</Link></p>
        </>
    )
}

export default Details