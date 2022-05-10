import * as React from 'react';
import LoadingCard from '../loaders/LoadingCard.jsx';
import StoreItem from '../cards/StoreItem.jsx';

const SimilarProducts = ({ loading = true, starships, type }) => {
  return (
    <section className="py-5 bg-light">
      <div className="container px-4 px-lg-5 mt-5">
        <h2 className="fw-bolder mb-4">Related products</h2>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {loading && [0, 1, 2, 3].map((card) => <LoadingCard key={card} />)}
          {!loading &&
            starships.length > 0 &&
            starships.map((starship) => (
              <StoreItem key={starship.url} {...{ type, ...starship }} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
