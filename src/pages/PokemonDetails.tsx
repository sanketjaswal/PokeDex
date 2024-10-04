import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { keyframes, styled } from 'styled-components';

import { PokemonDetail, PokemonType } from '../models';
import { fetchEvolutionData, fetchPokemonDetails } from '../apis';
// import { EvolutionChain } from '../models/evolutionData';
import RangeSlider from '../components/rangeTab';

export const PokemonDetails: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null,
  );
  // const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>();
  const [type, setType] = useState<PokemonType | undefined>();
  // const [evolutionArr, setEvolutionArr] = useState<any[]>([]);

  const { id } = useParams<string>();

  //Single Pokemon details API call
  const getPokemonDetails = async () => {
    if (id) {
      const res = await fetchPokemonDetails(id);
      setPokemonDetails(res);

      setType(res.types[0].type.name);
      console.log(res);
      const evoChain = await fetchEvolutionData(res.name);
      console.log(evoChain.chain);
    } else {
      console.log('id not found');
    }
  };

  useEffect(() => {
    getPokemonDetails();
  }, []);

  // Recursively render the evolution chain
  // const getEvolutionChain = (chain: EvolutionChain['chain'] | undefined) => {
  //   const chainArray: any[] = [];

  //   chainArray.push({
  //     name: chain.species.name,
  //     id: chain.species.url.split('/').slice(-2, -1)[0],
  //     url: chain.species.url,
  //   });

  //   if (chain.evolves_to.length > 0) {
  //     chain.evolves_to.forEach((evolution) => getEvolutionChain(evolution));
  //   }

  //   setEvolutionArr(chainArray);
  // };

  return (
    <Container type={type || 'gray'}>
      <DetailsCard>
        <SubDetailsCard>
          <FadedImageHolder>
            <FadeOne
              src={
                pokemonDetails?.sprites.other['official-artwork'].front_default
              }
            ></FadeOne>
          </FadedImageHolder>
          <Title>{pokemonDetails?.name}</Title>
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
              <InfoCardDetails>
                The plant blooms when it is absorbing solar energy. It stays on
                the move to seek sunlight.
              </InfoCardDetails>
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
      <MoreDetails>
        <Heading>Profile</Heading>
        <MoreDetailsContainer>
          <AbilityHolder>
            <AbilityHeading>Ability</AbilityHeading>
            <ul>
              {pokemonDetails?.abilities.map((item) => (
                <ULItem key={item.ability.name}>{item.ability.name}</ULItem>
              ))}
            </ul>
          </AbilityHolder>

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
              <StatValue>6.4 kg (14.1 lbs)</StatValue>
            </InfoData>
            <InfoData>
              <StatKey>Height</StatKey>
              <StatValue>1 m</StatValue>
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
        </MoreDetailsContainer>

        <Heading>Base Stats</Heading>
        <RangeContainer>
          <RangeSlider name={'HP'} value={80} />
          <RangeSlider name={'Attack'} value={20} />
          <RangeSlider name={'Defence'} value={30} />
          <RangeSlider name={'Speed'} value={600} />
          <RangeSlider name={'Special Attack'} value={50} />
          <RangeSlider name={'Special Defence'} value={40} />
        </RangeContainer>

        <Heading>Evolution</Heading>
        <EvolutionContainer>
          <EvolutionCard>
            <EvolutionImage
              src={
                pokemonDetails?.sprites.other['official-artwork'].front_default
              }
            ></EvolutionImage>
          </EvolutionCard>
          <EvolutionCard>
            <EvolutionImage
              src={
                pokemonDetails?.sprites.other['official-artwork'].front_default
              }
            ></EvolutionImage>
          </EvolutionCard>
          <EvolutionCard>
            <EvolutionImage
              src={
                pokemonDetails?.sprites.other['official-artwork'].front_default
              }
            ></EvolutionImage>
          </EvolutionCard>
        </EvolutionContainer>
        {/* {evolutionChain ? (
          <div>
            {.map((evolution, index) => (
              <div key={index}>
                <p>
                  Name: {evolution.name} <br />
                  ID: {evolution.id} <br />
                  URL: <a href={evolution.url}>{evolution.url}</a>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )} */}
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

const Container = styled.div<{ type: PokemonType }>`
  width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.pokemonType[props.type] || 'gray'};
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-block: 35px;
`;

const DetailsCard = styled.div`
  width: 92%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #ffffff;
  border-radius: 40px;
  animation: ${fadeIn} 0.5s ease-in-out 1s forwards;
  opacity: 0;
  background: radial-gradient(#ffffff67, transparent);
  @media only screen and (max-width: 1200px) {
    /* flex-direction: column-reverse; */
    height: 60vh;
    /* background-color: green; */
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
    height: 90vh;
  }
  @media only screen and (max-width: 480px) {
    flex-direction: column-reverse;
    height: 80vh;
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
    width: 70%;
    flex-direction: column;
  }
  @media only screen and (max-width: 600px) {
    width: 90%;
    flex-direction: column;
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
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
`;

const FadeOne = styled.img`
  width: 60%;
  opacity: 0.5;
  filter: blur(2px);

  position: absolute;
`;

const Title = styled.h1`
  font-size: 70px;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 20%;
  text-transform: capitalize;
  /* font-family: 'Pokemon Hollow', sans-serif; */
  word-spacing: 5px;
  font-family: 'Pokemon Hollow', sans-serif;
  @media only screen and (max-width: 1200px) {
    top: 5%;
    font-size: 50px;
  }
  @media only screen and (max-width: 800px) {
    top: -10%;
  }
`;

const CoverImage = styled.img`
  width: 70%;
  height: 70%;
  position: absolute;
  filter: blur(1px);
`;

const Image = styled.img`
  width: 350px;
  z-index: 1;
  @media only screen and (max-width: 1200px) {
    width: 280px;
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
  }
  @media only screen and (max-width: 480px) {
    width: 80px;
  }
`;

const InfoCard = styled.div`
  position: absolute;
  bottom: 15%;
  border: 1px solid #ffffff21;
  border-radius: 8px;
  width: 400px;
  display: flex;
  color: #2d2d2d;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background: radial-gradient(circle, #ffffffde, #c1c1c16b);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.407);
  transition: background 0.3s ease;

  &:hover {
    background: radial-gradient(circle, #ffffffc5, #c1c1c118);
  }

  &:hover ${InfoCardImage} {
    transform: scale(1.4);
    transition: transform 0.2s ease-in-out;
  }
  @media only screen and (max-width: 1200px) {
    transform: scale(0.8);
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
    bottom: 10%;
  }
  @media only screen and (max-width: 480px) {
    width: 110%;
    padding: 5px;
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
  justify-content: space-between;
  align-items: center;
  font-family: 'Pokemon solid', sans-serif;
  transition: color 0.3s ease;
`;

const InfoCardDetails = styled.p`
  font-size: 15px;
  transition: color 0.3s ease;
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

const MoreDetails = styled.div`
  width: 92%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #ffffff;
  border-radius: 40px;
`;

const MoreDetailsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  width: 70%;
  max-width: 1200px;
`;

const AbilityHolder = styled.div`
  background: radial-gradient(circle, #ffffffde, #c1c1c16b);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 45%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.407);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.407);
  }
  &:first-child {
    width: 25%;
    box-shadow: 0 4px 15px rgba(0, 121, 107, 0.2);
  }
`;

const AbilityHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #555;
`;

const ULItem = styled.li`
  list-style-type: none;
  margin: 5px 0;
  color: #444;
`;

const InfoData = styled.div`
  margin-bottom: 10px;
  /* background-color: #c32d2d; */
  display: flex;
  justify-content: space-between;
`;

const StatKey = styled.span`
  font-weight: bold;
  color: #555;
`;

const StatValue = styled.span`
  color: #777;
`;

const Heading = styled.h2`
  margin-block: 10px;
  width: 100%;
  text-align: left;
  margin-left: 8%;
  font-family: 'Pokemon Hollow', sans-serif;
`;

const RangeContainer = styled.div`
  width: 80%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const EvolutionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const EvolutionCard = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: #8080805b;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EvolutionImage = styled.img`
  width: 70%;
  height: auto;
  filter: saturate(1.5);
  /* background-color: red; */
`;
