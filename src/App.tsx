import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import './App.css';

import { theme } from './theme/theme';
import { Home } from './pages/Home';
import { DetailsPage } from './pages/Details';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemonDetails" element={<DetailsPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
