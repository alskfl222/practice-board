import React from 'react';
import styled from 'styled-components';
import { PostEventType } from '../@types';
import { theme } from '../styles/theme';

interface InputTextLineProps {
  id?: string;
  name?: string;
  type?: string;
  width?: string;
  placeholder?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: PostEventType) => void;
}

const InputTextLineInput = styled.input<InputTextLineProps>`
  width: ${({ width }) => width || '200px'};
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  &:focus {
    border-bottom: 2px solid ${theme.border.red};
  }
`;

function InputTextLine(props: InputTextLineProps) {
  const {
    name,
    width = '200px',
    value = '',
    type = 'text',
    placeholder,
    onChange,
  } = props;
  return (
    <InputTextLineInput
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
