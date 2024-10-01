import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_POKEMON_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});
