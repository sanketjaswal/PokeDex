import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { styled } from 'styled-components';

import { PokemonDetail } from '../models';

export const DetailsPage: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null,
  );
  const location = useLocation();

  useEffect(() => {
    setPokemonDetails(location.state.pokemonDetails);
    console.log(location.state.pokemonDetails);
  }, []);

  return <Container>{pokemonDetails?.name}</Container>;
};

//Styled Components
const Container = styled.div`
  background-color: red;
`;
