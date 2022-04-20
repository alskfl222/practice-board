import React from 'react';
import styled from 'styled-components';
import { InputTextLineType } from '../@types';
import { theme } from '../styles/theme';

const CuntomInput = styled.input``;

function InputTextLine(props: Partial<InputTextLineType>) {
  const { name, type = 'text', placeholder, onChange } = props;
  return (
    <CuntomInput
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    ></CuntomInput>
  );
}

export default InputTextLine;
