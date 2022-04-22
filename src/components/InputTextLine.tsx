import React from 'react';
import styled from 'styled-components';
import { InputTextLineType } from '../@types';
import { theme } from '../styles/theme';

const CuntomInput = styled.input`
  width: 200px;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  &:focus {
    border-bottom: 2px solid ${theme.border.red};
  }
`;

function InputTextLine(props: Partial<InputTextLineType>) {
  const { name, value = '', type = 'text', placeholder, onChange } = props;
  return (
    <CuntomInput
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></CuntomInput>
  );
}

export default InputTextLine;
