import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const instance = Axios.create({
  baseURL: process.env.REACT_APP_POKEMON_URL,
  timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
});
export const api = instance; // setupCache(instance);
