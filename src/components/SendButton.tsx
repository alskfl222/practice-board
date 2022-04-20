import React from 'react';
import styled from 'styled-components';
import { SendButtonType } from '../@types';

function SendButton(props: SendButtonType) {
  const { disabled = false, children = 'DEFAULT BUTTON' } = props;
  return <input type='submit' disabled={disabled} value={children} />;
}

export default SendButton;
