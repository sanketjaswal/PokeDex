import axios from 'axios';

import { api } from './api';
import {
  ListPokemon,
  ListResponse,
  ListType,
  PokemonDetail,
  TypeResponse,
} from '../models';
import { PokemonSpeciesData } from '../models/pokemonSpecies';

interface PaginationProps {
  offset: number;
  limit: number;
}

//get all pokemons Details
export const fetchPokemons = async ({ offset, limit }: PaginationProps) => {
  const res = await api.get<ListResponse<ListPokemon>>(
    `/pokemon/?offset=${offset}&limit=${limit}`,
  );
  return res?.data;
};

// get single pokemon's data
export const fetchPokemonDetails = async (PokemonId: string) => {
  const res = await api.get<PokemonDetail>(`/pokemon/${PokemonId}`);
  return res?.data;
};

//fetch filtered Pokemon List
export const fetchFilteredPokeList = async (givenUrl: string) => {
  const res = await axios.get<TypeResponse>(givenUrl);
  return res?.data;
};

export const fetchPokemonSpices = async (name: string) => {
  const res = await api.get<PokemonSpeciesData>(`pokemon-species/${name}`);
  return res?.data;
};

//get type list
export const fetchPokemonTypeList = async () => {
  const res = await api.get<ListResponse<ListType>>(`/type`);
  return res?.data;
};

//get evolution data

export const fetchEvolutionData = async (pokemonName: string) => {
  const evo = await api.get(`/pokemon-species/${pokemonName}`);
  const evolutionUrl = evo?.data.evolution_chain.url;
  const res = await axios.get(evolutionUrl);
  // console.log(res?.data);
  return res?.data;
};
