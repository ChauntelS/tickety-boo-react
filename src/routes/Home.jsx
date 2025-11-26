import { useEffect,useState } from 'react'
import HauntCard from '../ui/HauntCard.jsx'

function Home() {

    // Define a state variable to hold photos
    const [haunts, setHaunts] = useState([])

    // Get API Url from environment variables
    const apiUrl = import.meta.env.VITE_HAUNT_API_URL

    // Fetch photos from API when component mounts
    useEffect(() => { 
        const getHaunts = async () => { 
            const response = await fetch(apiUrl) 
            const result = await response.json() 

            if(response.ok) { 
                setHaunts(result)
            }
        } 

        getHaunts()
    }, [])

    return (
 <>
            <div className="haunt-grid">
            {
                haunts.length > 0 && (
                    haunts.map(haunt => (
                        <div key={haunt.Id}>
                            <HauntCard HauntId={haunt.Id} Filename={haunt.ImagePath} HauntTitle={haunt.Title} />
                        </div>
                    ))                    
                )
            }
            </div>
        </>
    )
}

export default Home