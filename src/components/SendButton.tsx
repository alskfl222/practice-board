import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

export default styled.button`
  min-width: 3rem;
  padding: 0.5rem;
  border: 1px solid ${theme.border.gray707070};
  border-radius: 1rem;
  background-color: transparent;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: default;
    &:hover {
      background-color: #ccc;
    }
  }
  &:hover {
    background-color: #0003;
  }
`;


