import React from 'react';
import { styled } from 'styled-components';

export const Header = () => {
  return (
    <Container>
      <H1>PokéDex</H1>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  /* height: 300px; */
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  font-family: 'Pokemon Hollow', sans-serif;
  color: white;
  font-size: 80px;
  margin: 0;
`;
