import * as React from 'react';
import FilmsContext from '../context/FilmsContext.jsx';

const useFilms = () => {
  const filmsContext = React.useContext(FilmsContext);

  if (filmsContext === undefined) {
    return Error("useFilms must be used within a <FilmsProvider />")
  }

  return filmsContext;
}

export default useFilms;