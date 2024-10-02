import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { PokemonDetail, PokemonType } from '../models';
import { useLocation } from 'react-router-dom';

export const PokemonDetails: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null,
  );
  const [type, setType] = useState<PokemonType | undefined>();
  const location = useLocation();

  useEffect(() => {
    setType(pokemonDetails?.types[0].type.name);
  }, [pokemonDetails]);

  useEffect(() => {
    setPokemonDetails(location.state.pokemonDetails);
  }, []);

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
                      src={`assets/${item.type.name}.svg`}
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
        {/* <HeadingContainer> */}
        <Heading>Evolution</Heading>
        {/* </HeadingContainer> */}
        {/* <HeadingContainer> */}
        <Heading>Evolution</Heading>
        {/* </HeadingContainer> */}
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
      </MoreDetails>
    </Container>
  );
};

//Styled Components
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
  background: radial-gradient(#ffffff67, transparent);
`;

const SubDetailsCard = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  opacity: 0.2;
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
`;

const CoverImage = styled.img`
  width: 80%;
  height: 80%;
  position: absolute;
  filter: blur(2px);
`;

const Image = styled.img`
  width: 400px;
  z-index: 1;
`;

const InfoCardImage = styled.img`
  width: 130px;
  transform: scale(1.2);
  transition: all.5s;
`;

const InfoCard = styled.div`
  position: absolute;
  bottom: 15%;
  border: 2px solid #ffffff;
  border-radius: 5px;
  width: 60%;
  min-height: 5%;
  display: flex;
  color: #2d2d2d;
  align-items: center;
  padding: 6px;
  cursor: pointer;
  background: radial-gradient(#ffffffc3, #c1c1c118);
  &:hover ${InfoCardImage} {
    transform: scale(1.4);
    transition: all.2s;
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
  justify-content: space-around;
  align-items: center;
  font-family: 'Pokemon solid', sans-serif;
`;

const InfoCardDetails = styled.p`
  font-size: 15px;
`;

const PokemonTypeHolder = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* flex-wrap: wrap; */
  gap: 10px;
`;

const TypeIcon = styled.img`
  width: 24px;
  height: 24px;
  padding: 6px;
  background-color: #fff;
  border-radius: 50%;
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

const Heading = styled.h2`
  margin-block: 10px;
  width: 100%;
  text-align: left;
  margin-left: 8%;
  font-family: 'Pokemon Hollow', sans-serif;
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
