import React from 'react';
import styled from 'styled-components';
import { InputTextLineType } from '../@types';
import { theme } from '../styles/theme';

const CuntomInput = styled.input`
  width: ${(props) => props.width};
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  &:focus {
    border-bottom: 2px solid ${theme.border.red};
  }
`;

function InputTextLine(props: Partial<InputTextLineType>) {
  const {
    name,
    width = '200px',
    value = '',
    type = 'text',
    placeholder,
    onChange,
  } = props;
  return (
    <CuntomInput
      type={type}
      width={width}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputTextLine;
