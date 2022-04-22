import React from 'react';
import styled from 'styled-components';
import { SendButtonType } from '../@types';
import { theme } from '../styles/theme';

const CustomSubmit = styled.input`
  padding: .5rem;
  border: 1px solid ${theme.border.gray707070};
  border-radius: .5rem;
`;

function SendButton(props: SendButtonType) {
  const { disabled = false, children = 'DEFAULT BUTTON' } = props;
  return <CustomSubmit type='submit' disabled={disabled} value={children} />;
}

export default SendButton;
