import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { styled } from 'styled-components';

import { PokemonDetail } from '../models';

export const DetailsPage: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null,
  );
  const location = useLocation();

  function capitalizeWhole(str: string | undefined) {
    if (!str) return;
    return str.toUpperCase();
  }

  useEffect(() => {
    setPokemonDetails(location.state.pokemonDetails);
    console.log(location.state.pokemonDetails);
  }, []);

  return (
    <Container>
      <DetailsCard>
        <Header>
          {/* cover */}
          <Cover>
            {/* image */}
            <Image
              src={
                pokemonDetails?.sprites.other['official-artwork'].front_default
              }
            ></Image>
            {/* Name */}
            <Title>{capitalizeWhole(pokemonDetails?.name)}</Title>
            <NumberHolder>
              {/* id */}
              <PokemonId>{pokemonDetails?.id}</PokemonId>
            </NumberHolder>
          </Cover>
          <BelowCover>
            {/* Ability */}
            <AbilityHolder>
              <Heading>Ability</Heading>
              <ul>
                {pokemonDetails?.abilities.map((item) => (
                  <ULItem key={item.ability.name}>{item.ability.name}</ULItem>
                ))}
              </ul>
            </AbilityHolder>
            {/* Dimension */}
            <DimensionContainer>
              <DimensionHolder>
                <DimensionHeading>Height</DimensionHeading>
                <Dimension>{pokemonDetails?.height}</Dimension>
              </DimensionHolder>
              <DimensionHolder>
                <DimensionHeading>Weight</DimensionHeading>
                <Dimension>{pokemonDetails?.weight}</Dimension>
              </DimensionHolder>
            </DimensionContainer>
          </BelowCover>
        </Header>
      </DetailsCard>
    </Container>
  );
};

//Styled Components
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.cardBGC};
  display: flex;
  justify-content: center;
`;
const DetailsCard = styled.div`
  width: 50%;
  background-color: ${(props) => props.theme.colors.background};
  /* box-shadow: inset 0 0 20px 5px gray; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 3%;
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  /* background-color: red; */
`;

const Cover = styled.div`
  background-color: gray;
  width: 100%;
  height: 250px;
  border-radius: 100px 70px 60px 80px;
  z-index: 1;
  position: relative;
  &:hover img {
    /* filter: saturate(2); */
  }
`;

const Title = styled.h1`
  /* background-color: blue; */
  position: absolute;
  font-size: 60px;
  bottom: -13%;
  right: 8%;
  margin: 0;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`;

const Image = styled.img`
  /* background-color: green; */
  width: 310px;
  position: absolute;
  bottom: -40%;
  left: -5%;
  filter: saturate(2);
`;

const NumberHolder = styled.div`
  background-color: green;
  width: 80px;
  height: 80px;
  margin: 0;
  position: absolute;
  right: -5%;
  bottom: 35%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PokemonId = styled.h2`
  font-size: 40px;
  color: white;
`;

const BelowCover = styled.div`
  display: flex;
`;
// Abilities
const AbilityHolder = styled.div`
  width: 35%;
  z-index: 0;
  border-radius: 30px 0px 50px 50px;
  /* min-height: 0px; */
  background-color: ${(props) => props.theme.colors.cardBGC};
  padding-block: 90px 10px;
`;

const Heading = styled.h1`
  /* background-color: gray; */
  font-size: 35px;
  text-align: center;
`;

const ULItem = styled.li`
  margin-left: 10%;
  margin-block: 5px;
  /* text-align: ; */
`;

//Dimentions
const DimensionContainer = styled.div`
  /* background-color: red; */
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 50px;
`;

const DimensionHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DimensionHeading = styled.p`
  /* color: green; */
  text-align: center;
  /* background-color: #fff; */
  margin: 0;
`;

const Dimension = styled.h1`
  color: green;
  text-align: center;
  /* background-color: #fff; */
  margin: 0;
  font-size: 50px;
`;
