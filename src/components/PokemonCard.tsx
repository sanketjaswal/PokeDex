import * as React from 'react';
import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { fetchPokemonDetails } from '../apis';
import { PokemonDetail, ListPokemon } from '../models';
import { useNavigate } from 'react-router-dom';

export const PokemonCard: React.FC<ListPokemon> = ({ name, url }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null,
  );

  //Single Pokemon details API call
  const getPokemonDetails = async () => {
    const res = await fetchPokemonDetails(url);
    // console.log(name, res);
    setPokemonDetails(res);
  };

  const navigate = useNavigate();

  const openPokemonDetails = () => {
    navigate('/pokemonDetails', { state: { pokemonDetails: pokemonDetails } });
  };

  // Captalize first letter
  function capitalizeFirstLetter(str: string | undefined) {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    getPokemonDetails();
  }, []);

  return (
    <CardContainer onClick={openPokemonDetails}>
      <ImageHolder>
        <Image
          src={pokemonDetails?.sprites.other['official-artwork'].front_default}
        ></Image>
      </ImageHolder>
      <CardContent>
        <CardNumber># {pokemonDetails?.id}</CardNumber>
        <CardTitle>{capitalizeFirstLetter(pokemonDetails?.name)}</CardTitle>
        <CardDetailsHolder>
          {pokemonDetails?.types.map((item) => (
            <CardDetails key={item?.type?.name} type={item?.type?.name}>
              {capitalizeFirstLetter(item?.type?.name)}
            </CardDetails>
          ))}
        </CardDetailsHolder>
      </CardContent>
    </CardContainer>
  );
};

//Styled Components
const CardContainer = styled.div`
  /* background-color: ${(props) => props.theme.colors.primary}; */
  width: 15%;
  margin-block: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  color: ${(props) => props.theme.colors.text};
  transition: all.5s;
  &:hover {
    transform: translateY(-15px);
    transition: all.1s;
    border-bottom: 2px solid ${(props) => props.theme.colors.cardBGC};

    /* box-shadow: inset 0 0 20px 2px gray; */
    /* filter: saturate(2); */
  }
  &:hover img {
    transform: scale(1.3);
    filter: drop-shadow(0 0 2px ${(props) => props.theme.colors.dropShadow})
      saturate(2);
    transition: ease-out 0.3s;
  }
`;

const ImageHolder = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  height: 230px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.cardBGC};
`;

const Image = styled.img`
  width: 70%;
  height: 70%;
  transition: all.8s;
`;

const CardContent = styled.div`
  display: flex;
  flex: 1;
  width: 90%;
  gap: 7px;
  padding: 5%;
  flex-direction: column;
`;

const CardTitle = styled.h2`
  font-size: 25px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
  margin: 0;
  /* margin-bottom: 8px; */
`;

const CardNumber = styled.div`
  font-size: 15px;
  color: gray;
  font-weight: 900;
`;

const CardDetailsHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
`;

const CardDetails = styled.div<{ type: string }>`
  font-size: 0.9rem;
  color: white;
  margin-bottom: 8px;
  padding: 2.5px 7px;
  width: 40%;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props) => {
    console.log(props.type);
    if (props.type === 'water') {
      return '#4592c4';
    } else if (props.type === 'fire') {
      return '#fd7d24';
    } else if (props.type === 'grass') {
      return '#9bcc50';
    } else if (props.type === 'bug') {
      return '#729f3f';
    } else if (props.type === 'poison') {
      return '#b97fc9';
    } else {
      return 'gray';
    }
  }};
`;
