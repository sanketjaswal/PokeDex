import * as React from 'react';
import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { fetchPokemonDetails } from '../apis';
import { PokemonDetail, ListPokemon, PokemonType } from '../models';
import { useNavigate } from 'react-router-dom';

export const PokemonCard: React.FC<ListPokemon> = ({ url }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null,
  );

  const [type, setType] = useState([]);

  //Navigate Object
  const navigate = useNavigate();

  //Single Pokemon details API call
  const getPokemonDetails = async () => {
    const res = await fetchPokemonDetails(url);
    // console.log(name, res);
    setPokemonDetails(res);
  };

  //Open pokemon Details page
  const openPokemonDetails = () => {
    navigate('/pokemonDetails', { state: { pokemonDetails: pokemonDetails } });
  };

  useEffect(() => {
    getPokemonDetails();
  }, []);

  return (
    <CardContainer onClick={openPokemonDetails}>
      <ImageHolder type={pokemonDetails?.types[0].type.name || 'gray'}>
        <TypeBackground
          key={pokemonDetails?.types[0].type.name}
          src={`assets/background/${pokemonDetails?.types[0].type.name}Bg.svg`}
        ></TypeBackground>
        <Image
          src={pokemonDetails?.sprites.other['official-artwork'].front_default}
        ></Image>
      </ImageHolder>
      {/* Pokemon Information */}
      <CardContent>
        <Name>{pokemonDetails?.name}</Name>
        <PokemonTypeHolder>
          <Number># {pokemonDetails?.id}</Number>
          {pokemonDetails?.types.map((item) => (
            <TypeIcon
              alt={item?.type?.name}
              key={item?.type?.name}
              src={`assets/${item.type.name}.svg`}
            ></TypeIcon>
          ))}
        </PokemonTypeHolder>
      </CardContent>
    </CardContainer>
  );
};

const Image = styled.img`
  width: 70%;
  transition: all.8s;
  z-index: 1;
  transform: translateY(25%);
`;

//Styled Components
const CardContainer = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-radius: 14px;
  overflow: hidden;
  color: ${(props) => props.theme.colors.text};
  transition: all.5s;
  /* &:hover {
    transform: translateY(-15px);
    border-bottom: 2px solid ${(props) => props.theme.colors.cardBGC};
    transition: all.1s;
  }
  &:active {
    transform: scale(0.9) translateY(-15px);
    transition: all.1s;
  }
  &:hover ${Image} {
    transform: scale(1.3);
    filter: drop-shadow(0 0 2px ${(props) => props.theme.colors.dropShadow})
      saturate(2);
    transition: ease-out 0.3s;
  } */
`;

const ImageHolder = styled.div<{ type: PokemonType }>`
  display: flex;
  width: 100%;
  border-radius: 0 0 50% 50% / 0% 0% 20% 20%;
  height: 150px;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ theme, type }) =>
    theme.pokemonType[type] || '#919AA2'};
`;

const CardContent = styled.div`
  padding: 8px;
  padding-top: 24px;
  align-self: stretch;
  display: flex;
  align-items: stretch;
  flex: 1;
  gap: 8px;
  flex-direction: column;
`;

const Name = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  text-transform: capitalize;
  font-family: 'Pokemon Hollow', sans-serif;
`;

const Number = styled.div`
  flex: 1;
  font-size: 16px;
  color: gray;
  font-weight: 900;
`;

const PokemonTypeHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8%;
`;

const TypeIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const PokemonTypeText = styled.div<{ type: PokemonType }>`
  font-size: 0.9rem;
  color: white;
  margin-bottom: 8px;
  padding: 2.5px 7px;
  width: 40%;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props) =>
    props.theme.pokemonType[props.type] || '#919AA2'};
`;

const TypeBackground = styled.img`
  width: 80%;
  height: 80%;
  position: absolute;
`;
