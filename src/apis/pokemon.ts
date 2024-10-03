import axios from 'axios';

import { api } from './api';
import {
  ListPokemon,
  ListResponse,
  ListType,
  PokemonDetail,
  TypeResponse,
} from '../models';

interface PaginationProps {
  offset: number;
  limit: number;
}

//get all pokemons Details
export const fetchPokemons = async ({ offset, limit }: PaginationProps) => {
  const res = await api.get<ListResponse<ListPokemon>>(
    `/pokemon/?offset=${offset}&limit=${limit}`,
  );
  // console.log(res);
  return res?.data;
};

// get single pokemon's data
export const fetchPokemonDetails = async (givenUrl: string) => {
  const res = await axios.get<PokemonDetail>(givenUrl);
  return res?.data;
};

export const fetchFilteredPokeList = async (givenUrl: string) => {
  const res = await axios.get<TypeResponse>(givenUrl);
  return res?.data;
};

//get type list
export const fetchPokemonTypeList = async () => {
  const res = await api.get<ListResponse<ListType>>(`/type`);
  return res?.data;
};
