import * as React from 'react';
import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { ListPokemon } from '../models';
import { fetchPokemons } from '../apis';
import { PokemonCard } from '../components/PokemonCard';
import { ThemeToggle } from '../components/ThemeBtn';

export const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<ListPokemon[]>([]);

  // pokemon List API call
  const getPokemonsList = async () => {
    const res = await fetchPokemons();
    console.log(res?.results);
    setPokemonList(res?.results);
  };

  useEffect(() => {
    getPokemonsList();
  }, []);

  return (
    <Container>
      <ThemeToggle />
      {pokemonList?.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </Container>
  );
};

//Styled Components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: first baseline;
  gap: 16px;
  flex: 1;
  padding: 4% 5%;
  min-height: 100vh;
  height: auto;
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
`;
