import '@babel/polyfill';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import StarshipsPage from './pages/StarshipsPage.jsx';
import VehiclesPage from './pages/VehiclesPage.jsx';
import ProductItemPage from './pages/ProductItemPage.jsx';
import Favorites from './pages/Favorites.jsx';
import { FilmsProvider } from './context/FilmsContext.jsx';
import { StarshipsProvider } from './context/StarshipsContext.jsx';

import './scss/app.scss';

const App = () => {
  return (
    <StarshipsProvider>
      <FilmsProvider>
        <BrowserRouter>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="starships" element={<StarshipsPage />} />
              <Route path="/starships/:id" element={<ProductItemPage />} />
              <Route path="vehicles" element={<VehiclesPage />} />
              <Route path="/vehicles/:id" element={<ProductItemPage />} />
              <Route path="favorites" element={<Favorites />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>404! This page was not found in the galaxy!</p>
                  </main>
                }
              />
            </Routes>

            <footer className="py-5 bg-dark">
              <div className="container">
                <p className="m-0 text-center text-white">Copyright &copy; The Galaxy Store 2022</p>
              </div>
            </footer>
          </>
        </BrowserRouter>
      </FilmsProvider>
    </StarshipsProvider>
  );
};

export default App;
