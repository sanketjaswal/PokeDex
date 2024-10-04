import React from 'react';
import { styled, keyframes } from 'styled-components';

interface SliderProps {
  name: string;
  value: number;
}

const RangeSlider: React.FC<SliderProps> = ({ name, value }) => {
  return (
    <Container>
      <DataName>{name}</DataName>
      <Slider>
        <RangeValue id="rangevalue">{value}</RangeValue>
        <OtherDiv>
          <InnerDiv value={value}></InnerDiv>
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
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0;
  position: relative;
  text-align: center;
  /* background-color: green; */
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;

const OtherDiv = styled.div`
  width: 100%;
  height: 40%;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  border: 1px solid white;
  position: relative;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(235, 235, 235, 0.886);
  }
`;

const InnerDiv = styled.div<{ value: number }>`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: #63bc5a;
  border-right: 1px solid white;
  animation: ${slideIn} 0.3s ease forwards;
  transition: width 0.3s ease;
`;

const RangeValue = styled.div`
  text-align: center;
  font-family: 'Quantico', sans-serif;
  font-size: 18px;
  min-width: 50px;
  transition: color 0.3s ease;
`;

const DataName = styled.div`
  width: 200px;
  color: white;
  font-size: 20px;
  text-align: end;
`;
