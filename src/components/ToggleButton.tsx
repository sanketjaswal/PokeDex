import React from 'react';
import { styled } from 'styled-components';

interface ToggleProps {
  setValue: (arg: boolean) => void;
  value: boolean;
}

// Toggle component
export const ToggleButton: React.FC<ToggleProps> = ({ setValue, value }) => {
  const handleToggle = () => {
    setValue(!value);
  };

  return (
    <ToggleContainer>
      <HiddenCheckbox type="checkbox" checked={value} onChange={handleToggle} />
      <Slider checked={value} imag="PokeDex/assets/pokeball.svg">
        {/* <SliderIcon src="assets/pokeball.svg" alt="pokeball icon" /> */}
      </Slider>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  transform: scale(0.9);
`;

const HiddenCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.div<{ checked: boolean; imag: string }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  transition: 0.4s;
  border-radius: 30px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 2px;
    top: 2px;
    background-color: red;
    background: url(${({ imag }) => imag});
    background-size: cover;
    transition: 0.7s;
    border-radius: 50%;
    transform: ${({ checked }) =>
      checked
        ? 'translateX(26px) rotate(310deg)'
        : 'translateX(0) rotate(10deg)'};
  }
`;
