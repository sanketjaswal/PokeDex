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
      <Slider checked={value} />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const HiddenCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<{ checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ checked }) =>
    checked ? 'linear-gradient(45deg, red  , #007bff )' : '#ccc'};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${({ checked }) =>
      checked ? 'translateX(26px)' : 'translateX(0)'};
  }
`;
