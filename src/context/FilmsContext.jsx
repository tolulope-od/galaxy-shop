import React, { createContext, useReducer } from 'react';
import { API } from '../config/api';
import init from './init';

const initialState = {
  films: [],
  filmsLoading: false,
  filmNameMap: {},
  error: '',
};

const FilmsContext = createContext(initialState);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'loadingFilms':
      return {
        ...state,
        filmsLoading: true,
      };
    case 'error':
      return {
        ...state,
        filmsLoading: false,
        error: payload,
      };
    case 'success':
      return {
        ...state,
        films: payload.films,
        filmNameMap: payload.filmNameMap,
      };
    case 'loadingDone':
      return {
        ...state,
        filmsLoading: false,
      };
    default:
      return init(initialState);
  }
};

const generateFilmNameMap = (allFilms) =>
  allFilms.reduce((accumulator, aFilm) => {
    if (!accumulator[aFilm.url]) {
      accumulator[aFilm.url] = aFilm.title;
    }
    return accumulator;
  }, {});

export const FilmsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const fetchFilms = async () => {
    dispatch({
      type: 'loadingFilms',
    });
    try {
      // check if the results already exist..
      const existingFilms = localStorage.getItem('starWarsFilmsCached');

      // check if the films exist and they need to be refreshed
      const today = new Date().getTime();
      if (existingFilms && today < JSON.parse(existingFilms).exp) {
        const films = JSON.parse(existingFilms);
        return dispatch({
          type: 'success',
          payload: {
            films: films.content,
            filmNameMap: films.filmNameMap,
          },
        });
      }

      // if films don't exist already or they need to be refreshed call the API
      const request = await API.get('films/?format=json');

      // store the results and set the expiry for 24 hours
      const tomorrow = new Date(today + 86400000).getTime();

      const cachedFilms = {
        content: request.data.results,
        exp: tomorrow,
      };
      const filmNameMap = generateFilmNameMap(cachedFilms.content);
      localStorage.setItem('starWarsFilmsCached', JSON.stringify({ ...cachedFilms, filmNameMap }));
      return dispatch({
        type: 'success',
        payload: {
          films: cachedFilms.content,
          filmNameMap,
        },
      });
    } catch (error) {
      dispatch({
        type: 'error',
        payload: 'An error occured while loading films. Please try again',
      });
    } finally {
      dispatch({
        type: 'loadingDone',
      });
    }
  };

  return (
    <FilmsContext.Provider
      value={{
        ...state,
        fetchFilms,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
};

export default FilmsContext;
