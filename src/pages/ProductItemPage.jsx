import * as React from 'react';
import { useLocation } from 'react-router-dom';
import ProductItem from '../components/catalogues/ProductItem.jsx';
import NavBar from '../components/layout/NavBar.jsx';
import SimilarProducts from '../components/fragments/SimilarProducts.jsx';
import useStarships from '../hooks/useStarships.js';

const ProductItemPage = () => {
  const state = useStarships();
  const location = useLocation();
  const isStarship = /starship/gi.test(location.pathname)

  const similarProductsProps = {
    type: isStarship ? 'Starship' : 'Vehicle',
    starships: isStarship ? state.starships.slice(0, 4) : state.vehicles.slice(0, 4),
    loading: state.starshipsLoading,
  }
  React.useEffect(() => {
    state.fetchStarShips();
  }, []);
  return (
    <>
      <NavBar />
      <ProductItem />
      <SimilarProducts {...similarProductsProps} />
    </>
  );
};

export default ProductItemPage;
