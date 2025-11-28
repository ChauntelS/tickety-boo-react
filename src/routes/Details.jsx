import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Details() {
    const { id } = useParams() 

    // Define a state variable to hold haunt by id
    const [haunt, setHaunt] = useState(null)

    // Get API Url from environment variables
    const apiUrl = import.meta.env.VITE_HAUNT_API_URL

    // Fetch haunt by id from API when component mounts
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

            <div className ="haunt-details"> 
              <div className="d-flex justify-content-center">
                <div className= "card text-bg-dark">
                { haunt && (
                    <>
                    
                        <img src={haunt.ImagePath} alt={haunt.Title} width= "400"/>
                        <h2>{haunt.Title}</h2>
                        <p>{haunt.Description}</p>
                        <p><strong>When: </strong>
                        {new Date(haunt.Date).toLocaleString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric"
                          })}
                          </p>
                        <p><strong>Location:</strong> {haunt.Location}</p>
                    </>
                )}
                </div>
              </div>
            </div>
            <div className ="purchase-link">
              <p><Link to={`/purchase/${id}`}>Purchase Tickets if You Dare!</Link></p>
              </div>
        </>
    )
}

export default Details
// 