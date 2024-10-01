import axios from 'axios';
import { api } from './api';

// find User By Username API
export const getPokemon = async () => {
  const res = await api.get('/');

  return res;
};
