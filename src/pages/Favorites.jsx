import * as React from 'react';
import NavBar from '../components/layout/NavBar.jsx';
import Header from '../components/layout/Header.jsx';
import LoadingCard from '../components/loaders/LoadingCard.jsx';
import StoreItem from '../components/cards/StoreItem.jsx';

const Favorites = () => {
  const [favoritesLoading, setfavoritesLoading] = React.useState(true);
  const [favorites, setFavorites] = React.useState([]);

  const fetchVehicles = async () => {
    setfavoritesLoading(true);
    try {
      const favoritesObj = localStorage.getItem('userSWVehicles&StarshipsFavs');

      if (favoritesObj) {
        const faves = JSON.parse(favoritesObj).favorites;
        setFavorites(faves);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setfavoritesLoading(false);
    }
  };

  React.useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
      <NavBar />
      <Header />
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="py-4">
            <h2>Favorites</h2>
          </div>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-start">
            {favoritesLoading && [0, 1, 2, 3, 4, 5, 6, 7].map((card) => <LoadingCard key={card} />)}

            {!favoritesLoading &&
              favorites.length > 0 &&
              favorites.map((vehicle) => <StoreItem key={vehicle.url} {...vehicle} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorites;
