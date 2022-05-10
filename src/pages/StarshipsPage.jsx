import * as React from 'react';
import NavBar from '../components/layout/NavBar.jsx';
import Starships from '../components/catalogues/Starships.jsx';
import useStarships from '../hooks/useStarships.js';

const StarshipsPage = () => {
  const state = useStarships();
  return (
    <>
      <NavBar />
      <section className="py-5">
        <Starships {...state} />
      </section>
    </>
  );
};

export default StarshipsPage;
