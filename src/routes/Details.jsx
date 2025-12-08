import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const [haunt, setHaunt] = useState(null);
  const apiUrl = import.meta.env.VITE_HAUNT_API_URL;

  useEffect(() => {
    const getHauntById = async () => {
      const response = await fetch(`${apiUrl}/${id}`);
      const result = await response.json();

      if (response.ok) setHaunt(result);
    };
    getHauntById();
  }, []);

  if (!haunt) return <p className="text-center text-white mt-5">Loading...</p>;

  return (
    <>
      {/* Floating Back Button */}
      <Link to="/" className="floating-back-btn">
        ← Home
      </Link>

      {/* Hero Banner */}
      <div
        className="details-hero"
        style={{ backgroundImage: `url(${haunt.ImagePath})` }}
      >
        <div className="details-hero-overlay">
          <h1 className="details-title">{haunt.Title}</h1>
        </div>
      </div>

      {/* Content Card */}
      <div className="details-container glass-card animated-border">

        {/* Description */}
        <p className="details-description">{haunt.Description}</p>

        <div className="details-info">
          <p className="details-date">
            <strong>📅 When:</strong><br />
            {new Date(haunt.Date).toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric"
            })}
          </p>

          <p className="details-location">
            <strong>📍 Location:</strong> {haunt.Location}
          </p>
        </div>

        {/* Purchase Button */}
        <div className="text-center mt-4">
          <Link to={`/purchase/${id}`} className="purchase-btn">
            🎟️ Purchase Tickets if You Dare!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Details;
