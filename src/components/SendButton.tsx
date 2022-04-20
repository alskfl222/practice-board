import React from 'react';
import styled from 'styled-components';

function SendButton(props: any) {
  const { children = 'DEFAULT BUTTON' } = props;
  return <input type='submit' value={children} />;
}

export default SendButton;
