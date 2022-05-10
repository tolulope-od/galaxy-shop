import * as React from 'react';
import { Link } from 'react-router-dom';
import { HeartFill } from 'react-bootstrap-icons';

const NavBar = () => {
  const [favesCount, setFavesCount] = React.useState(0);
 
  const getFavesCount = () => {
    const favesCache = localStorage.getItem('userSWVehicles&StarshipsFavs');

    if (favesCache) {
      setFavesCount(JSON.parse(favesCache)?.favorites?.length);
    }
  }

  React.useEffect(() => {
    getFavesCount();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to="/">
          The Galaxy Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/">
                    All Products
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/starships">
                    Starships
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/vehicles">
                    Vehicles
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <Link className="btn btn-outline-dark" to="/favorites">
              <span className="me-1">
                <HeartFill />
              </span>
              Favorites
              <span className="badge bg-dark text-white ms-1 rounded-pill">{favesCount}</span>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;