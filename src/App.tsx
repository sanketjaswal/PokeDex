import React from 'react';
import './App.css';
import { Home } from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
