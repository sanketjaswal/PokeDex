import axios from 'axios';

import { api } from './api';
import { PokemonDetail, PokemonListResponse } from '../models';

interface PaginationProps {
  offset: number;
  limit: number;
}

//Fetch all pokemons List
export const fetchAllPokemons = async () => {
  const res = await api.get<PokemonListResponse>('/?offset=0&limit=905');

  console.log(res);
  return res?.data;
};

//Fetch all Custom pokemons List
export const fetchCustomPokemons = async () => {
  const res = await api.get<PokemonListResponse>('/?offset=906&limit=1303');

  console.log(res);
  return res?.data;
};

//get all pokemons Details
export const fetchPokemons = async ({ offset, limit }: PaginationProps) => {
  const res = await api.get<PokemonListResponse>(
    `/?offset=${offset}&limit=${limit}`,
  );
  console.log(res);
  return res?.data;
};

// get single pokemon's data
export const fetchPokemonDetails = async (givenUrl: string) => {
  const res = await axios.get<PokemonDetail>(givenUrl);

  return res?.data;
};
