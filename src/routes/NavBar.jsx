import { Outlet, Link } from "react-router-dom";

function NavLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand fw-bold" to="/">Tickety Boo</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upcoming">Upcoming</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container my-4">
        <Outlet />
      </div>
    </>
  );
}
export default NavLayout;