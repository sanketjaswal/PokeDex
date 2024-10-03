import * as React from 'react';
import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { ListPokemon, ListType, PokemonType } from '../models';
import {
  fetchFilteredPokeList,
  fetchPokemons,
  fetchPokemonTypeList,
} from '../apis';
import { ThemeToggle } from '../components/ThemeBtn';
import { PokemonCard } from '../components/PokemonCard';
import { ToggleButton } from '../components/ToggleButton';

export const Home: React.FC = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [allPokemons, setAllPokemons] = useState<ListPokemon[]>([]);
  const [pokemons, setPokemons] = useState<ListPokemon[]>([]);
  const [types, setTypes] = useState<ListType[]>([]);
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState<ListPokemon[]>([]);

  const limit = 30;

  //Fetch All Pokemon list
  const getAllPokemonList = async () => {
    try {
      const res = await fetchPokemons({ offset: 0, limit: 1303 });
      setAllPokemons(res?.results);
      // showPokemons();
      setPokemons(res?.results.slice(0, limit));
    } catch (error) {
      console.error('getAllPokemonList', error);
    }
  };

  //Pokemons types list
  const getPokemonTypes = async () => {
    try {
      const res = await fetchPokemonTypeList();
      setTypes(res?.results);
    } catch (error) {
      console.error('getPokemonTypes', error);
    }
  };

  const showPokemons = () => {
    let p: ListPokemon[] = [];
    let result: ListPokemon[] = [];

    if (showAll) {
      p = allPokemons;
    } else {
      p = allPokemons.slice(0, 905);
    }

    if (filter != '') {
      for (const item of filteredList) {
        for (const main of p) {
          if (main.name == item.name) {
            result.push(item);
          }
        }
      }
    } else {
      result = p;
    }

    if (searchString != '') {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchString.toLowerCase()),
      );
    }

    if (filter == '' && searchString == '') {
      result = allPokemons.slice(0, limit);
    }

    setPokemons(result);
  };

  useEffect(() => {
    getAllPokemonList();
    getPokemonTypes();
  }, []);

  //pagination
  const getNextPageData = async () => {
    try {
      const res = await fetchPokemons({ offset: pokemons.length, limit });
      setPokemons([...pokemons, ...res?.results]);
    } catch (error) {
      console.error('getNextPageData', error);
    }
  };

  //Onchange Search
  const handleSearch = (search: string) => {
    setSearchString(search);
  };

  //Filter pokemon search
  const getFilteredPokemons = async (f: ListPokemon) => {
    if (filter == f.name) {
      setFilter('');
      // setPokemons(allPokemons.slice(0, limit));
      setFilteredList([]);
    } else {
      setFilter(f.name);
      const res = await fetchFilteredPokeList(f.url);
      const a = res.pokemon.map((p) => p.pokemon);
      setFilteredList(a);
    }
    showPokemons();
  };

  useEffect(() => {
    showPokemons();
  }, [showAll, filteredList, searchString]);

  return (
    <Container>
      {/* <ThemeToggle /> */}
      <Form>
        <StyledInput
          type="text"
          id="helo"
          placeholder="Search Pokémon by name"
          value={searchString}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ToogleContainer>
          <ToggleButton setValue={setShowAll} value={showAll}></ToggleButton>
          <ToggleText>{showAll ? 'Classic ' : 'All'}</ToggleText>
        </ToogleContainer>
      </Form>
      <FilterHolder>
        {types?.map((item) => (
          <FilterButton
            onClick={() => getFilteredPokemons(item)}
            type={item.name}
            key={item.name}
            $active={filter == item.name}
          >
            <p>{item.name} </p>
            <TypeIcon
              alt={item?.name}
              src={`assets/${item.name}.svg`}
            ></TypeIcon>
          </FilterButton>
        ))}
      </FilterHolder>
      <PokimonHolder>
        {pokemons?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
        {searchString == '' && filter == '' && (
          <StyledButton onClick={getNextPageData}>
            Show more Pokemons
          </StyledButton>
        )}
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
  padding: 4% 5%;
  gap: 16px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
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

const FilterHolder = styled.div`
  width: 100%;
  padding: 2% 20%;
  display: flex;
  justify-content: center;
  color: white;
  flex-wrap: wrap;
  gap: 20px;
  /* background-color: red; */
`;

const FilterButton = styled.div<{ type: PokemonType; $active: boolean }>`
  min-width: 30px;
  padding: 6px 12px;
  border: 2px solid white;
  border-radius: 6px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, type, $active }) =>
    $active ? theme.colors.secondary : 'transparent'};
  p {
    color: white;
    margin: 0;
    text-transform: capitalize;
  }
  cursor: pointer;
`;

const TypeIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ToogleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding-top: 20px;
`;

const ToggleText = styled.p`
  color: white;
  margin: 0;
  text-transform: uppercase;
`;
