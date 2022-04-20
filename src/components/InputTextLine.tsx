import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const CuntomInput = styled.input``;

function InputTextLine(props: any) {
  const { name, placeholder, onChange } = props;
  return (
    <CuntomInput
      type='text'
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    ></CuntomInput>
  );
}

export default InputTextLine;
