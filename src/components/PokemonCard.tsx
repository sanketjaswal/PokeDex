import * as React from 'react';
import { useEffect, useState } from 'react';

import { keyframes, styled } from 'styled-components';

import { fetchPokemonDetails } from '../apis';
import { PokemonDetail, ListPokemon, PokemonType } from '../models';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';

export const PokemonCard: React.FC<ListPokemon> = ({ url }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null,
  );
  const [id, setId] = useState<string>();

  //Single Pokemon details API call
  const getPokemonDetails = async (pokeid: string) => {
    try {
      const res = await fetchPokemonDetails(pokeid);
      setPokemonDetails(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log(url);
    setId(url.split('/')[6]);
    getPokemonDetails(url.split('/')[6]);
  }, []);

  if (!pokemonDetails) {
    return <Loader></Loader>;
  }
  return (
    <CardContainer>
      <StyledLink
        type={pokemonDetails?.types[0].type.name || 'gray'}
        to={`/pokemon/${id}`}
      >
        <ImageHolder type={pokemonDetails?.types[0].type.name || 'gray'}>
          <TypeBackground
            key={pokemonDetails?.types[0].type.name}
            src={`assets/background/${pokemonDetails?.types[0].type.name}Bg.svg`}
          ></TypeBackground>
          <Image
            className="card-image"
            // onLoad={handleImageLoad}
            // src={currentImage}
            src={
              pokemonDetails?.sprites.other['official-artwork'].front_default
            }
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
      </StyledLink>
    </CardContainer>
  );
};

//Styled Components
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

const Image = styled.img`
  width: 70%;
  transition: all.8s;
  z-index: 1;
  transform: translateY(25%);
  @media only screen and (max-width: 465px) {
    width: 80%;
  }
`;

const Name = styled.p`
  font-size: 20px;
  margin: 0;
  text-align: center;
  text-transform: capitalize;
  transition: all.3s;
  font-family: 'Pokemon Hollow', sans-serif;
  @media only screen and (max-width: 465px) {
    background-color: #fff;
    width: 100%;
    text-align: center;
  }
`;

const CardContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-radius: 14px;
  overflow: hidden;
  color: ${(props) => props.theme.colors.text};
  transition: all.5s;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-in-out 1s forwards;
  &:hover {
    transform: translateY(-10px);
    transition: all.1s;
  }
  &:active {
    transform: scale(0.9);
    transition: all.1s;
  }
  &:hover ${Image} {
    filter: drop-shadow(0 0 5px ${(props) => props.theme.colors.dropShadow})
      saturate(2);
    transition: ease-out 0.3s;
  }

  &:hover ${Name} {
    font-family: 'Pokemon Solid', sans-serif;
    /* transition: 0.5s; */
  }

  @media only screen and (max-width: 800px) {
    width: 200px;
  }
  @media only screen and (max-width: 465px) {
    width: 40%;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)<{ type: PokemonType }>`
  width: 100%;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-shadow: 0 0 5px white;
    color: ${({ theme, type }) => theme.pokemonType[type] || 'black'};
  }
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

  @media only screen and (max-width: 465px) {
    height: 130px;
  }
`;

const CardContent = styled.div`
  padding: 8px;
  padding-top: 10px;
  align-self: stretch;
  display: flex;
  align-items: stretch;
  flex: 1;
  gap: 8px;
  flex-direction: column;
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

const TypeBackground = styled.img`
  width: 80%;
  height: 80%;
  position: absolute;
`;
