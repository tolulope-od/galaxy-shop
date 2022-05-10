import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

export const API = {
  get(endpoint, config = null) {
    return config ? instance.get(endpoint, config) : instance.get(endpoint);
  },
}