import * as React from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import formatNumber from '../../utils/formatNumber';
import { addOrRemoveFavorite } from '../../utils/addOrRemoveFavorite';

const baseURL = 'https://swapi.dev/api/';

const StoreItem = ({ name, model, type, cost_in_credits, url, ...rest }) => {
  const handleRemoveOrAdd = () => {
    addOrRemoveFavorite(
      {
        ...rest,
        name,
        model,
        type,
        cost_in_credits,
        url,
      },
      (value) => {
        console.log(value);
      }
    );
  };
  const imgSrc =
    type === 'Starship'
      ? 'https://res.cloudinary.com/tolulope-od/image/upload/v1652143375/josue-as-_nprTIIwSk4-unsplash_zohnoh.jpg'
      : 'https://res.cloudinary.com/tolulope-od/image/upload/v1652144632/jerome-boursier-q7UAevltCMg-unsplash_lhhpvl.jpg';
  return (
    <div className="col mb-5">
      <div className="card h-100">
        <div
          className="badge bg-dark text-white position-absolute"
          style={{ top: '0.5rem', right: '0.5rem' }}
        >
          {type || 'Type'}
        </div>
        <img className="card-img-top" src={imgSrc} alt={name} />

        <div className="card-body p-4">
          <div className="text-left">
            <p className="m-0 text-sm text-muted">
              <small>{model || 'model'}</small>
            </p>
            <h5 className="fw-bolder">{name || 'Name'}</h5>
            <div className="d-flex justify-content-center small text-warning mb-2" />$
            {!isNaN(cost_in_credits)
              ? formatNumber(Number(cost_in_credits) / 100.0)
              : cost_in_credits}
          </div>
        </div>

        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              to={`/${url.split(baseURL)[1]}`}
              className="btn btn-outline-dark me-md-2"
              type="button"
              state={{
                item: {
                  ...rest,
                  name,
                  model,
                  type,
                  cost_in_credits,
                  url,
                },
              }}
            >
              View More
            </Link>
            <button onClick={handleRemoveOrAdd} className="btn btn-outline-danger" type="button">
              <HeartFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
