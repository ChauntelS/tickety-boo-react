import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/logo.png'

function NavLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
         {/* Logo */}
      <Link to="/">
        <img 
          src={logo} 
          alt="Haunted Logo" 
          style={{ height: '50px', objectFit: 'contain', marginRight: '10px' }} 
        />
      </Link>
        <Link className="navbar-brand fw-bold" to="/">Tickety Boo</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            
          </ul>

          {/* Search Bar */}
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by title, location, or date..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </nav>

      {/* Pass searchTerm to children */}
      <Outlet context={{ searchTerm }} />
    </>
  );
}

export default NavLayout;
