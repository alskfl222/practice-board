import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationBarType } from '../@types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const NavigationTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const NavigationBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NavigationBar(props: NavigationBarType) {
  const navigate = useNavigate();
  return (
    <Container>
      <NavigationTop>
        <a onClick={() => navigate('/')}>HOME</a>
      </NavigationTop>
      <NavigationBottom>{props.children}</NavigationBottom>
    </Container>
  );
}

export default NavigationBar;
