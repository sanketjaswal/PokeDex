import React, { useState } from 'react';

import { styled } from 'styled-components';

export const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <ToggleWrapper>
        <HiddenCheckbox
          type="checkbox"
          id="theme-toggle-checkbox"
          checked={isDarkMode}
          onChange={handleToggle}
        />
        <ThemeIcon isDarkMode={isDarkMode} htmlFor="theme-toggle-checkbox">
          <SunIcon isDarkMode={isDarkMode} />
          <MoonIcon isDarkMode={isDarkMode} />
        </ThemeIcon>
      </ToggleWrapper>
    </Container>
  );
};

//Styled Components
const ToggleWrapper = styled.div`
  position: relative;
  /* width: auto; */
  height: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  border-radius: 30px;
`;

const ThemeIcon = styled.label<{ isDarkMode: boolean }>`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  margin-inline: ${(props) => (props.isDarkMode ? '-10px' : '10px')};
`;

const SunIcon = styled.div<{ isDarkMode: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: yellow;
  box-shadow: 0 0 10px 2px rgba(255, 255, 0, 0.6);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  opacity: ${(props) => (props.isDarkMode ? 0 : 1)};
  transform: ${(props) =>
    props.isDarkMode ? 'rotate(180deg) scale(0)' : 'rotate(0) scale(1)'};
`;

const MoonIcon = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.6);
  clip-path: circle(50% at 70% 40%);
  transform: ${(props) => (props.isDarkMode ? 'scale(1)' : 'scale(0)')};
  transition: transform 0.5s ease;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const Container = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? 'black' : 'transparent')};
  transition: background-color 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  top: 20px;
  right: 48%;
  border-radius: 50%;
  position: absolute;
`;
