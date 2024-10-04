import React from 'react';
import { styled, keyframes } from 'styled-components';
import { PokemonType } from '../models';

interface SliderProps {
  name: string;
  value?: number;
  type?: PokemonType;
}

const maxStats = {
  hp: 255,
  attack: 190,
  defense: 230,
  'special-attack': 194,
  'special-defense': 230,
  speed: 180,
};
const calculatePercentage = (statName: string, value: number): number => {
  const maxValue = maxStats[statName as keyof typeof maxStats];
  return (value / maxValue) * 100;
};

const RangeSlider: React.FC<SliderProps> = ({ name, value, type }) => {
  return (
    <Container>
      <DataName>{name}</DataName>
      <Slider>
        <RangeValue id="rangevalue">{value}</RangeValue>
        <OtherDiv>
          <InnerDiv type={type || 'gray'} value={value || 50}></InnerDiv>
        </OtherDiv>
      </Slider>
    </Container>
  );
};

export default RangeSlider;

// Styled components
const slideIn = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

const Container = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  @media only screen and (max-width: 1200px) {
    width: 45%;
  }
  @media only screen and (max-width: 550px) {
    width: 90%;
    margin: 5px 0;
  }
`;

const DataName = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
  font-family: 'Quicksand bold', sans-serif;
`;

const Slider = styled.div`
  /* width: 300px; */
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const RangeValue = styled.div`
  font-size: 14px;
  color: #666;
  width: 40px;
  text-align: right;
  font-family: 'Quicksand Book', sans-serif;
`;

const OtherDiv = styled.div`
  position: relative;
  background-color: #ccc;
  height: 6px;
  flex-grow: 1;
  border-radius: 3px;
  overflow: hidden;
`;

const InnerDiv = styled.div<{ value: number; type: PokemonType }>`
  background-color: ${(props) => props.theme.pokemonType[props.type] || 'gray'};
  height: 100%;
  width: ${({ value }) => value}%;
  transition: width 0.3s ease;
  border-radius: 3px;
  animation: ${slideIn} 1s ease;
`;
