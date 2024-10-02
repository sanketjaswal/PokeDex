import * as React from 'react';
import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { ListPokemon } from '../models';
import { fetchPokemons } from '../apis';
import { PokemonCard } from '../components/PokemonCard';
import { ThemeToggle } from '../components/ThemeBtn';
import { ToggleButton } from '../components/ToggleButton';

export const Home: React.FC = () => {
  const [searchPoki, setSearchPoki] = useState<string>('');
  const [customPoki, setCustomPoki] = useState<boolean>(false);

  const [allPokemons, setAllPokemons] = useState<ListPokemon[]>([]);
  const [pokemonList, setPokemonList] = useState<ListPokemon[]>([]);

  const limit = 30;

  //Fetch All Pokemon list
  const getAllPokemonList = async () => {
    try {
      const res = await fetchPokemons({ offset: 0, limit: 1303 });
      // console.log(res?.results[0]);
      setAllPokemons(res?.results);
      setPokemonList(res?.results.slice(0, limit));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPokemonList();
  }, []);

  const getNextPageData = async () => {
    console.log(pokemonList.length, limit);
    const res = await fetchPokemons({ offset: pokemonList.length, limit });
    // console.log(res?.results);
    setPokemonList([...pokemonList, ...res?.results]);
  };

  //Onchange Search
  const handleSearch = (search: string) => {
    let searchData = allPokemons;
    if (search) {
      if (!customPoki) {
        searchData = allPokemons?.slice(0, 905);
      }
      setSearchPoki(search);
      const filtered: ListPokemon[] = searchData?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      setPokemonList(filtered);
      console.log(filtered);
    } else {
      setSearchPoki(search);
    }
  };

  useEffect(() => {
    handleSearch(searchPoki);
  }, [customPoki]);

  return (
    <Container>
      {/* <ThemeToggle /> */}
      <Form>
        <StyledInput
          type="text"
          id="helo"
          placeholder="Search Pokémon by name"
          value={searchPoki}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ToggleButton
          setValue={setCustomPoki}
          value={customPoki}
        ></ToggleButton>

        {customPoki ? 'All ' : 'Classic'}
      </Form>
      <PokimonHolder>
        {pokemonList?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
        <StyledButton onClick={getNextPageData}>
          Show more Pokemons
        </StyledButton>
      </PokimonHolder>
    </Container>
  );
};

//Styled Components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: first baseline;
  flex: 1;
  min-height: 100vh;
  height: auto;
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
`;

const PokimonHolder = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* align-items: flex-start; */
  padding: 4% 5%;
  gap: 16px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  /* background-color: red; */
`;

export const StyledInput = styled.input`
  width: 15%;
  padding: 10px;
  margin: 10px 0;
  border: 0px;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Styled Button
export const StyledButton = styled.button`
  background-color: #0099ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b32400;
  }

  &:active {
    background-color: #940000;
  }
`;
