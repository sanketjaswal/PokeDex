import * as React from 'react';
import { useEffect, useState } from 'react';

import { keyframes, styled } from 'styled-components';

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
  }, [showAll, filteredList, searchString, allPokemons]);

  return (
    <Container>
      {/* <ThemeToggle /> */}
      <Form>
        <StyledInput
          type="text"
          id="helo"
          placeholder="Search Pokémon"
          value={searchString}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ToogleContainer>
          <ToggleButton setValue={setShowAll} value={showAll}></ToggleButton>
          <ToggleText>{showAll ? 'Classic ' : 'All'}</ToggleText>
        </ToogleContainer>
      </Form>
      <FilterHolder>
        {types?.map((item) =>
          item.name == 'stellar' || item.name == 'unknown' ? (
            ''
          ) : (
            <FilterButton
              onClick={() => getFilteredPokemons(item)}
              type={item.name}
              key={item.name}
              $active={filter == item.name}
            >
              <span>{item.name} </span>
              <TypeIcon
                alt={item?.name}
                src={
                  filter != item.name
                    ? `assets/${item.name}.svg`
                    : `assets/background/${item.name}Bg.svg`
                }
              ></TypeIcon>
            </FilterButton>
          ),
        )}
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
            Show
            <img src="assets/pokeball.svg"></img>
            More
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
  padding: 16px 0;
`;

export const StyledInput = styled.input`
  min-width: 200px;
  min-height: 46px;
  padding: 10px;
  border: 0px;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Button
export const StyledButton = styled.button`
  background: linear-gradient(black, transparent, #c6c6c6);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 40%;
  border-bottom: 2px solid white;
  display: flex;
  justify-content: space-evenly;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 900;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out 3s forwards;

  &:hover {
    transition: all.2s;
    img {
      transform: scale(2) translateY(8px);
      transition: all.3s;
    }
  }

  &:active {
    /* background-color: #cd3131; */
    transition: all.1s;
    /* color: white; */
    img {
      transform: scale(1) translateY(8px);
      transition: all.4s;
    }
  }

  img {
    width: 30px;
    transition: all.5s;
  }
`;

const FilterHolder = styled.div`
  width: 100%;
  padding: 2% 10%;
  display: flex;
  justify-content: center;
  color: white;
  flex-wrap: wrap;
  gap: 16px;
  @media only screen and (max-width: 800px) {
    gap: 10px;
    padding: 1% 6%;
  }
`;

const FilterButton = styled.div<{ type: PokemonType; $active: boolean }>`
  /* min-width: 30px; */
  padding: 6px 12px;
  border: 2px solid ${({ theme, type }) => theme.pokemonType[type]};
  border-radius: 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  transition: all.5s;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out 0.5s forwards;
  background-color: ${({ theme, type, $active }) =>
    $active ? theme.pokemonType[type] : 'transparent'};
  span {
    color: white;
    text-transform: capitalize;
  }
  cursor: pointer;
  &:hover {
    transition: all.3s;
    background-color: ${({ theme, type, $active }) =>
      $active ? theme.pokemonType[type] : '#ffffff21'};
  }
`;

const TypeIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ToogleContainer = styled.div`
  display: flex;
  flex-direction: column;
  transform: scale(0.9);
  align-items: center;
  gap: 2px;
`;

const ToggleText = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: 14px;
`;
