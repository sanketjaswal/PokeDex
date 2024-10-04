import React from 'react';
import { keyframes, styled } from 'styled-components';

export const Loader = () => {
  return (
    <LoaderContainer>
      <Loading src="assets/loader.svg"></Loading>
      <LoadPokeball src="assets/pokeball.svg"></LoadPokeball>
    </LoaderContainer>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
  
`;

const rotateReverse = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
  
`;

const LoaderContainer = styled.div`
  width: 50px;
  height: 50px;
  margin: 30px 75px;
  /* background-color: blue; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  animation: ${rotate} 1s ease infinite;
`;

const LoadPokeball = styled.img`
  width: 70%;
  height: 70%;
  animation: ${rotateReverse} 2s ease-in-out infinite;
`;
