import * as React from 'react';
import { HeartFill } from 'react-bootstrap-icons';

const LoadingCard = () => (
  <div className="col mb-5">
    <div className="card h-100">
      <div className="card-img-top h-50 placeholder-glow">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="178"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#dee2e6"></rect>
        </svg>
      </div>
      <div className="card-body">
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
        </p>
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
          <span className="placeholder col-4"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
        </p>
      </div>

      <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
        <div className="placeholder-glow d-grid gap-2 d-md-flex justify-content-md-start">
          <a href="#" tabIndex="-1" className="btn btn-dark disabled placeholder col-6"></a>
          <a className="btn btn-outline-dark disabled placeholder">
            <HeartFill />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingCard;
