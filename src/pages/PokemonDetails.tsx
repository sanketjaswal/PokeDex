import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { keyframes, styled } from 'styled-components';

import { PokemonDetail, PokemonType } from '../models';
import {
  fetchEvolutionData,
  fetchPokemonDetails,
  fetchPokemonSpices,
} from '../apis';
// import { EvolutionChain } from '../models/evolutionData';
import RangeSlider from '../components/rangeTab';
import { PokemonSpeciesData } from '../models/pokemonSpecies';

export const PokemonDetails: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null,
  );
  const [speciesData, setSpeciesData] = useState<PokemonSpeciesData | null>(
    null,
  );
  const [type, setType] = useState<PokemonType | undefined>();

  const { id } = useParams<string>();

  const getDescription = () => {
    return speciesData?.flavor_text_entries.find(
      (entry) => entry.language.name === 'en',
    )?.flavor_text;
  };

  //Single Pokemon details API call
  const getPokemonDetails = async () => {
    if (id) {
      const res = await fetchPokemonDetails(id);
      setPokemonDetails(res);
      setType(res.types[0].type.name);
      const spices = await fetchPokemonSpices(res.name);
      setSpeciesData(spices);
      console.log('PokemonSpeciesData', spices);
    } else {
      console.log('id not found');
    }
  };

  useEffect(() => {
    getPokemonDetails();
  }, []);

  return (
    <Container>
      <DetailsCard type={type || 'gray'}>
        <SubDetailsCard>
          <FadedImageHolder>
            <FadeOne
              src={
                pokemonDetails?.sprites.other['official-artwork'].front_default
              }
            ></FadeOne>
          </FadedImageHolder>
          <Title type={type || 'gray'}>{pokemonDetails?.name}</Title>
          <InfoCard>
            <InfoDivider>
              <InfoCardImage
                src={pokemonDetails?.sprites.front_default}
              ></InfoCardImage>
            </InfoDivider>
            <InfoDivider>
              <InfoCardHead>
                {pokemonDetails?.name}
                <PokemonTypeHolder>
                  {pokemonDetails?.types.map((item) => (
                    <TypeIcon
                      alt={item?.type?.name}
                      key={item?.type?.name}
                      src={`assets/${item?.type?.name}.svg`}
                    ></TypeIcon>
                  ))}
                </PokemonTypeHolder>
              </InfoCardHead>
              <InfoCardDetails>{getDescription()}</InfoCardDetails>
            </InfoDivider>
          </InfoCard>
        </SubDetailsCard>
        <SubDetailsCard>
          <CoverImage src={`assets/background/${type}Bg.svg`}></CoverImage>
          <Image
            src={pokemonDetails?.sprites.other.dream_world.front_default}
          ></Image>
        </SubDetailsCard>
      </DetailsCard>
      <MoreDetails type={type || 'gray'}>
        {/* <Heading>Profile</Heading> */}
        <MoreDetailsContainer>
          <AbilityHolder>
            <InfoData>
              <StatKey>Introduced</StatKey>
              <StatValue>Generation I</StatValue>
            </InfoData>
            <InfoData>
              <StatKey>Category</StatKey>
              <StatValue>Flycatcher Pokémon</StatValue>
            </InfoData>
            <InfoData>
              <StatKey>Weight</StatKey>
              <StatValue>{pokemonDetails?.weight} </StatValue>
            </InfoData>
            <InfoData>
              <StatKey>Height</StatKey>
              <StatValue>{pokemonDetails?.height} </StatValue>
            </InfoData>
            <InfoData>
              <StatKey>Shape</StatKey>
              <StatValue>Blob</StatValue>
            </InfoData>
            <InfoData>
              <StatKey>Color</StatKey>
              <StatValue>Green</StatValue>
            </InfoData>
          </AbilityHolder>
          <AbilityHolder>
            <RangeSlider
              type={type}
              name={'HP'}
              value={
                pokemonDetails?.stats.find((stat) => stat.stat.name === 'hp')
                  ?.base_stat
              }
            />
            <RangeSlider
              type={type}
              name={'Attack'}
              value={
                pokemonDetails?.stats.find(
                  (stat) => stat.stat.name === 'attack',
                )?.base_stat
              }
            />
            <RangeSlider
              type={type}
              name={'Defence'}
              value={
                pokemonDetails?.stats.find(
                  (stat) => stat.stat.name === 'defense',
                )?.base_stat
              }
            />
            <RangeSlider
              type={type}
              name={'Speed'}
              value={
                pokemonDetails?.stats.find((stat) => stat.stat.name === 'speed')
                  ?.base_stat
              }
            />
            <RangeSlider
              type={type}
              name={'Special Attack'}
              value={
                pokemonDetails?.stats.find(
                  (stat) => stat.stat.name === 'special-attack',
                )?.base_stat
              }
            />
            <RangeSlider
              type={type}
              name={'Special Defence'}
              value={
                pokemonDetails?.stats.find(
                  (stat) => stat.stat.name === 'special-defense',
                )?.base_stat
              }
            />
          </AbilityHolder>
        </MoreDetailsContainer>

        {/* <Heading>Base Stats</Heading> */}
      </MoreDetails>
    </Container>
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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-block: 35px;
`;

const DetailsCard = styled.div<{ type: PokemonType }>`
  width: 92%;
  height: 90vh;
  display: flex;
  overflow: hidden;

  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.pokemonType[props.type] || 'gray'};
  box-shadow: -5px 2px 10px 0px #000000c3;
  border-radius: 40px;
  animation: ${fadeIn} 0.5s ease-in-out 1s forwards;
  opacity: 0;
  @media only screen and (max-width: 1200px) {
    height: 60vh;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
    height: 90vh;
  }
  @media only screen and (max-width: 480px) {
    flex-direction: column-reverse;
    height: 90vh;
  }
`;

const SubDetailsCard = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* border: 2px solid blue; */

  @media only screen and (max-width: 800px) {
    width: 92%;
    flex-direction: column;
  }
`;

const FadedImageHolder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  box-shadow: 0 0 10px black;
  @media only screen and (max-width: 800px) {
    border-radius: 0;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
  }
  @media only screen and (max-width: 480px) {
  }
`;

const FadeOne = styled.img`
  width: 60%;
  opacity: 0;
  filter: blur(1px);
  position: absolute;
`;

const Title = styled.p<{ type: PokemonType }>`
  font-size: 70px;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 10%;
  color: ${(props) => props.theme.pokemonType[props.type]};
  text-transform: capitalize;
  font-family: 'Pokemon Hollow', sans-serif;
  word-spacing: 5px;
  @media only screen and (max-width: 1200px) {
    top: 5%;
    font-size: 50px;
  }
  @media only screen and (max-width: 800px) {
    top: -5%;
  }

  @media only screen and (max-width: 450px) {
    top: 0%;
  }
`;

const CoverImage = styled.img`
  width: 70%;
  height: 70%;
  position: absolute;
  filter: blur(1px);
  /* background-color: #fff; */
`;

const Image = styled.img`
  width: 350px;
  z-index: 1;
  animation: ${float} 4s ease-in-out infinite;
  @media only screen and (max-width: 1200px) {
    width: 280px;
    /* top: 10%; */
  }
  @media only screen and (max-width: 800px) {
    width: 250px;
    top: 10%;
  }
  @media only screen and (max-width: 600px) {
    top: 10%;
  }
`;

const InfoCardImage = styled.img`
  width: 130px;
  transform: scale(1.2);
  transition: transform 0.5s ease-in-out;
  @media only screen and (max-width: 800px) {
    width: 100px;
  }
  @media only screen and (max-width: 480px) {
    width: 80px;
  }
`;

const InfoCard = styled.div`
  position: absolute;
  bottom: 25%;
  border: 1px solid #ffffff21;
  border-radius: 40px;
  width: 450px;
  display: flex;
  color: #2d2d2d;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background: radial-gradient(circle, #ffffffde, #c1c1c16b);
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.644);
  transition: background 0.3s ease;

  &:hover ${InfoCardImage} {
    transform: scale(1.4);
    transition: transform 0.2s ease-in-out;
  }
  @media only screen and (max-width: 1200px) {
    transform: scale(0.8);
    bottom: 15%;
    width: 400px;
    padding: 8px;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
    bottom: 8%;
    padding: 7px;
  }
  @media only screen and (max-width: 480px) {
    width: 110%;
    padding: 5px 2px;
    bottom: 0%;
  }
`;

const InfoDivider = styled.div`
  padding: 2px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const InfoCardHead = styled.h3`
  text-transform: capitalize;
  font-size: 25px;
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  font-family: 'Quicksand bold', sans-serif;
  transition: color 0.3s ease;
`;

const InfoCardDetails = styled.p`
  font-size: 18px;
  transition: color 0.3s ease;
  font-family: 'Quicksand Book', sans-serif;
`;

const PokemonTypeHolder = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;

const TypeIcon = styled.img`
  width: 24px;
  height: 24px;
  padding: 6px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const MoreDetails = styled.div<{ type: PokemonType }>`
  width: 92%;
  min-height: 30vh;
  display: flex;
  padding: 3% 0%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: ${(props) => props.theme.pokemonType[props.type] || 'gray'};
  box-shadow: -5px 2px 10px 0px #000000c3;
  border-radius: 40px;
  animation: ${fadeIn} 0.5s ease-in-out 1s forwards;
  opacity: 0;
`;

const MoreDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  /* background-color: red; */
  padding: 0 2%;
  @media only screen and (max-width: 1200px) {
    flex-direction: column-reverse;
    align-items: center;
  }
  @media only screen and (max-width: 800px) {
  }
  @media only screen and (max-width: 480px) {
  }
`;

const AbilityHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 60%;
  gap: 10px;
  padding: 20px 10px;
  background: white;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.644);
  transition: background 0.3s ease;
  border-radius: 15px;
  &:first-child {
    width: 35%;
    padding: 20px 5px;
    background: radial-gradient(circle, #ffffffde, #c1c1c16b);
  }

  @media only screen and (max-width: 1200px) {
    width: 90%;
    &:first-child {
      width: 90%;
    }
  }
  @media only screen and (max-width: 800px) {
    &:first-child {
      width: 90%;
      /* width: max-content; */
    }
  }
  @media only screen and (max-width: 550px) {
    padding: 15px 5px;
  }
`;

// InfoData styling
const InfoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 10px;
  justify-content: space-around;
  /* gap: 10%; */
  border-radius: 5px;
  min-width: 150px;
  @media only screen and (max-width: 1200px) {
    width: 20%;
    padding: 20px 10px;
  }
  @media only screen and (max-width: 800px) {
  }
  @media only screen and (max-width: 480px) {
  }
`;

const StatKey = styled.div`
  font-weight: bold;
  font-family: 'Quicksand bold', sans-serif;
  color: #333;
`;

const StatValue = styled.div`
  font-family: 'Quicksand Book', sans-serif;
  color: #666;
`;
