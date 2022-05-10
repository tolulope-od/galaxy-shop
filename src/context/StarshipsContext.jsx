import * as React from 'react';
import init from './init';
import { API } from '../config/api';

const initialState = {
  starships: [],
  starshipsLoading: false,
  error: '',
  next: null,
  previous: null,
  vehicles: [],
  vehiclesNext: null,
  vehiclesPrevious: null,
};

const StarshipsContext = React.createContext(initialState);

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'starshipsLoading':
      return {
        ...state,
        starshipsLoading: true,
      };
    case 'error':
      return {
        ...state,
        starshipsLoading: false,
        error: payload,
      };
    case 'starshipsSuccess':
      return {
        ...state,
        starships: payload.results,
        next: payload.next,
        previous: payload.previous,
      };
    case 'vehiclesSuccess':
      return {
        ...state,
        vehicles: payload.results,
        vehiclesNext: payload.next,
        vehiclesPrevious: payload.previous,
      }
    case 'loadingDone':
      return {
        ...state,
        starshipsLoading: false,
      };
    default:
      return init(initialState);
  }
};

export const StarshipsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchStarShips = async (starshipsURL = 'starships/?format=json', cb = null) => {
    dispatch({
      type: 'starshipsLoading',
    });
    try {
      const request = await API.get(starshipsURL);
      if (cb) {
        cb(request.data.results);
      } else {
        if (starshipsURL === 'starships/?format=json') {
          dispatch({
            type: 'starshipsSuccess',
            payload: request.data,
          });
        } else {
          dispatch({
            type: 'vehiclesSuccess',
            payload: request.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: 'loadingDone',
      });
    }
  };

  return (
    <StarshipsContext.Provider
      value={{
        ...state,
        fetchStarShips,
      }}
    >
      {children}
    </StarshipsContext.Provider>
  );
};

export default StarshipsContext;
