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
  const [upcomingSoon, setUpcomingSoon] = useState([])

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
 <div className="glass-banner mb-4 p-4 rounded-3  text-white shadow-sm rounded">
    
        <h4 className="fw-bold mb-2 text-center">🔥 Events Happening in the Next 10 Days 🔥</h4>
        <div className= "alert-info py-3 mb-4 shadow-sm ">
          
        </div>
        <div className="container text-center">
        {upcomingSoon.length === 0 && <p>No upcoming events.</p>}
        {upcomingSoon.length > 0 && (
          <div className="row align-items-start justify-content-center">
            {upcomingSoon.map(event => (
              <div key={event.Id} className="col-auto mb-4 d-flex align-items-center justify-content-center gap-3">
                {/* <img src={event.ImagePath} alt={event.Title} width="104" height="136" className="img-responsive rounded-3" /> */}
                <div className="text-start">
                  <strong>{event.Title}</strong>
                  <div>{new Date(event.Date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
            <h1 className="mb-4 text-white text-center ">Haunted Events</h1>
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