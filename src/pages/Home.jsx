import * as React from 'react';
import NavBar from '../components/layout/NavBar.jsx';
import Header from '../components/layout/Header.jsx';
import Starships from '../components/catalogues/Starships.jsx';
import useStarships from '../hooks/useStarships.js';

const Home = () => {
  const state = useStarships();
  return (
    <>
      <NavBar />
      <Header />
      <section className="py-5">
        <Starships {...state} />
        <Starships
          catalogue={'vehicles'}
          title="Vehicles"
          type="Vehicle"
          starships={state.vehicles}
          starshipsLoading={state.starshipsLoading}
          fetchStarShips={state.fetchStarShips}
          next={state.vehiclesNext}
          previous={state.vehiclesPrevious}
        />
      </section>
    </>
  );
};

export default Home;
