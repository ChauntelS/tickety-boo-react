import { useEffect,useState } from 'react'
import HauntCard from '../ui/HauntCard.jsx'

function getEventsWithin10Days(events) {
  const today = new Date();
  const tenDaysFromNow = new Date()
  tenDaysFromNow.setDate(today.getDate() + 10)

  return events.filter(event => {
    const eventDate = new Date(event.Date);
    return eventDate >= today && eventDate <= tenDaysFromNow
  });
}

function Home() {

    // Define a state variable to hold haunts
    const [haunts, setHaunts] = useState([])

    // Get API Url from environment variables
    const apiUrl = import.meta.env.VITE_HAUNT_API_URL

    // Fetch haunts from API when component mounts
    useEffect(() => { 
        const getHaunts = async () => { 
            const response = await fetch(apiUrl) 
            const result = await response.json() 

            if(response.ok) { 
                setHaunts(result)

                // filter events for the banner
                const soon = getEventsWithin10Days(result)
                setUpcomingSoon(soon)
            }
        } 

        getHaunts()
    }, [])

    return (
 <>
 <div className="banner mb-4 p-4 rounded-3 bg-dark text-white shadow-sm rounded">
    <div className= "alert-info py-3 mb-4 shadow-sm "></div>
        <h4 className="fw-bold mb-2">🔥 Events Happening in the Next 10 Days</h4>
        <div className="d-flex flex-wrap gap-3">
        {haunts.length === 0 && <p>No upcoming events.</p>}
        {haunts.length > 0 && (
          <ul>
            {getEventsWithin10Days(haunts).map(event => (
              <li key={event.Id}>
                <strong>{event.Title}</strong> - {new Date(event.Date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
            <h1 className="mb-4">Haunted Locations</h1>
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