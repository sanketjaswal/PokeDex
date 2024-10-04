import React from 'react';
import { styled, keyframes } from 'styled-components';
import { PokemonType } from '../models';

interface SliderProps {
  name: string;
  value?: number;
  type?: PokemonType;
}

const MaxStats: Record<string, number> = {
  HP: 255,
  Attack: 190,
  Defense: 230,
  'Special Attack': 194,
  'Special Defense': 230,
  Speed: 180,
};

const RangeSlider: React.FC<SliderProps> = ({ name, value = 0, type }) => {
  const calculatePer = () => {
    return (value / MaxStats[name]) * 100;
  };

  return (
    <Container>
      <DataName>{name}</DataName>
      <Slider>
        <RangeValue id="rangevalue">{value}</RangeValue>
        <OtherDiv>
          <InnerDiv type={type || 'gray'} value={calculatePer()}></InnerDiv>
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
