import React from 'react';
import styled from 'styled-components';
import { SendButtonType } from '../@types';
import { theme } from '../styles/theme';

const CustomSubmit = styled.button`
  min-width: 3rem;
  padding: 0.5rem;
  border: 1px solid ${theme.border.gray707070};
  border-radius: 1rem;
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

function SendButton(props: SendButtonType) {
  const { onClick, disabled = false, children = 'DEFAULT BUTTON' } = props;
  return (
    <CustomSubmit type='submit' disabled={disabled} onClick={onClick}>
      {children}
    </CustomSubmit>
  );
}

export default SendButton;
