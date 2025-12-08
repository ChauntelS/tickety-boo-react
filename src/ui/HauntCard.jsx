import { Link } from 'react-router-dom';

function HauntCard({ HauntId, Filename, HauntTitle }) {
  return (
    <div className="haunt-grid-item">
      <div className="glass-card shadow-sm h-100 border-0 relative overflow-hidden">
        {/* Image */}
        <img
          src={Filename}
          alt={HauntTitle}
          className="card-img-fluid rounded-top haunt-image"
          style={{ height: "200px", objectFit: "cover" }}
        />

        {/* Title Overlay */}
        <div className="haunt-title-overlay">
          <h5>{HauntTitle}</h5>
        </div>

        {/* Card Body */}
        <div className="card-body d-flex flex-column text-center text-white p-3">
          <Link
            to={`/details/${HauntId}`}
            className="btn mt-auto py-1"
            style={{
              backgroundColor: 'var(--color-accent1)',
              color: 'var(--color-dark)',
              fontWeight: '600',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
          >
            Get Haunt Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HauntCard;