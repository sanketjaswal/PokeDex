import axios from 'axios';

import { api } from './api';
import { PokemonDetail, PokemonListResponse } from '../models';

// find first pokemons
export const fetchPokemons = async () => {
  const res = await api.get<PokemonListResponse>('/?offset=0&limit=100');
  console.log(res);
  return res?.data;
};

// get single pokemon's data
export const fetchPokemonDetails = async (givenUrl: string) => {
  const res = await axios.get<PokemonDetail>(givenUrl);

  return res?.data;
};
