import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { theme } from '../styles/theme';

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h1 {
    font-size: 3rem;
  }
`;

const HorizonDivider = styled.div`
  width: 70%;
  box-shadow: 0 0.5px 0 0.5px black;
`;
const AnchorContainer = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const PageAnchor = styled.a`
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`;

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>HOME PAGE</h1>
      <HorizonDivider />
      <AnchorContainer>
        <PageAnchor onClick={() => navigate('/signin')}>SIGNIN</PageAnchor>
        <PageAnchor onClick={() => navigate('/post')}>POST</PageAnchor>
      </AnchorContainer>
    </Container>
  );
}

export default Home;
