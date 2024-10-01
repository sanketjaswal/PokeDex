import * as React from 'react';

import { styled } from 'styled-components';

import { getPokemon } from '../apis/pokemonApi';

export const Home = () => {
  //pokemon call
  const call = async () => {
    const res = await getPokemon();
    console.log(res?.data?.results);
  };

  React.useEffect(() => {
    call();
  });

  return <Container onClick={call}></Container>;
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  background-color: ${(props) => props.theme.colors.background};
`;
