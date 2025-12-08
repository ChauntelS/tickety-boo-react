import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from "react-router-dom";
import HauntCard from '../ui/HauntCard.jsx';

function getEventsWithin10Days(events) {
  const today = new Date();
  const tenDaysFromNow = new Date();
  tenDaysFromNow.setDate(today.getDate() + 10);

  return events.filter(event => {
    const eventDate = new Date(event.Date);
    return eventDate >= today && eventDate <= tenDaysFromNow;
  });
}

function Home() {
  const { searchTerm } = useOutletContext();
  const [haunts, setHaunts] = useState([]);
  const [upcomingSoon, setUpcomingSoon] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const apiUrl = import.meta.env.VITE_HAUNT_API_URL;

  useEffect(() => {
    const getHaunts = async () => {
      const response = await fetch(apiUrl);
      const result = await response.json();
      if (response.ok) {
        setHaunts(result);
        setUpcomingSoon(getEventsWithin10Days(result));
      }
    };
    getHaunts();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (upcomingSoon.length === 0) return;
    const interval = setInterval(() => {
      setCurrentEventIndex(prev => (prev + 1) % upcomingSoon.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [upcomingSoon]);

  const handlePrev = () => {
    setCurrentEventIndex(prev =>
      prev === 0 ? upcomingSoon.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentEventIndex(prev =>
      prev === upcomingSoon.length - 1 ? 0 : prev + 1
    );
  };

  const filteredHaunts = haunts.filter(haunt => {
    const term = searchTerm.toLowerCase();
    return (
      haunt.Title.toLowerCase().includes(term) ||
      (haunt.Location && haunt.Location.toLowerCase().includes(term)) ||
      new Date(haunt.Date).toLocaleDateString().includes(term)
    );
  });

  return (
    <>
      {/* Centered Single-Event Banner */}
      <section className="glass-banner relative rounded-xl shadow-lg mb-6 p-4 flex flex-col items-center justify-center">
        <h2 className="text-center text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--color-accent1)' }}>
          🔥 Events Happening in the Next 10 Days 🔥
        </h2>

        {upcomingSoon.length === 0 ? (
          <p className="text-center text-gray-300">No upcoming events.</p>
        ) : (
          <div className="relative flex items-center justify-center w-full max-w-md">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 z-10 p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-accent1)',
                color: 'var(--color-dark)',
                fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              aria-label="Previous Event"
            >
              ◀
            </button>

            {/* Event Card */}
            <div className="bg-[var(--color-dark)] text-white rounded-xl shadow-lg overflow-hidden w-full flex-shrink-0 flex flex-col items-center justify-center">
              {upcomingSoon[currentEventIndex].ImagePath && (
                <img
                  src={upcomingSoon[currentEventIndex].ImagePath}
                  alt={upcomingSoon[currentEventIndex].Title}
                  className="banner-event-image"
                />
              )}
              <div className="p-3 text-center">
                <h3 className="font-bold text-lg" style={{ color: 'var(--color-accent1)' }}>
                  {upcomingSoon[currentEventIndex].Title}
                </h3>
                <p style={{ color: 'var(--color-accent2)' }}>
                  {new Date(upcomingSoon[currentEventIndex].Date).toLocaleDateString()}
                </p>
                {upcomingSoon[currentEventIndex].Location && (
                  <p style={{ color: 'var(--color-accent3)' }}>
                    {upcomingSoon[currentEventIndex].Location}
                  </p>
                )}
                <Link to={`/details/${upcomingSoon[currentEventIndex].Id}`}>
                  <button
                    className="mt-2 py-2 px-4 rounded transition"
                    style={{
                      backgroundColor: 'var(--color-accent1)',
                      color: 'var(--color-dark)',
                    }}
                  >
                    Get Details
                  </button>
                </Link>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 z-10 p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-accent1)',
                color: 'var(--color-dark)',
                fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              aria-label="Next Event"
            >
              ▶
            </button>
          </div>
        )}
      </section>

      {/* All Haunted Events */}
      <h1 className="mb-4 text-white text-center">Haunted Events</h1>
      <div className="haunt-grid">
        {filteredHaunts.length > 0 ? (
          filteredHaunts.map(haunt => (
            <div key={haunt.Id}>
              <HauntCard
                HauntId={haunt.Id}
                Filename={haunt.ImagePath}
                HauntTitle={haunt.Title}
              />
            </div>
          ))
        ) : (
          <p className="text-white text-center mt-8">
            No events found matching your search.
          </p>
        )}
      </div>
    </>
  );
}

export default Home;
