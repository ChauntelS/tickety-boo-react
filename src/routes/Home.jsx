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
      {/* Upgraded Banner with Animations */}
     <section className="glass-banner relative rounded-xl shadow-lg mb-6 p-4 overflow-hidden">
  <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-4" style={{ color: 'var(--color-accent1)' }}>
    🔥 Events Happening in the Next 10 Days 🔥
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {upcomingSoon.length === 0 ? (
      <p className="text-center text-gray-300 col-span-full">No upcoming events.</p>
    ) : (
      upcomingSoon.map((event, index) => (
        <div
          key={event.Id}
          className="bg-[var(--color-dark)] text-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:brightness-110"
          style={{
            animation: `fadeInUp 0.5s ease forwards`,
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
          }}
        >
          {event.ImagePath && (
            <img
              src={event.ImagePath}
              alt={event.Title}
              className="w-full h-36 object-cover"
            />
          )}
          <div className="p-3">
            <h3 className="font-bold text-lg" style={{ color: 'var(--color-accent1)' }}>{event.Title}</h3>
            <p style={{ color: 'var(--color-accent2)' }}>
              {new Date(event.Date).toLocaleDateString()}
            </p>
            
            {event.Location && <p style={{ color: 'var(--color-accent3)' }}>{event.Location}</p>}
           <Link to={`/details/${event.Id}`}>
           <button
           className="mt-2 w-full py-2 rounded transition"
           style={{
            backgroundColor: 'var(--color-accent1)',
            color: 'var(--color-dark)',
          }}
          >Get Details</button>
          </Link>
          </div>
        </div>
      ))
    )}
  </div>

  <style>
    {`
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `}
  </style>
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

      {/* Inline animation keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}

export default Home;
