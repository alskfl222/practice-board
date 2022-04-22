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

  header {
    display: flex;
    align-items: center;
    height: 7rem;
  }
  h1 {
    padding: 1rem;
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
      <header>
        <h1>홈페이지</h1>
      </header>
      <HorizonDivider />
      <AnchorContainer>
        <PageAnchor onClick={() => navigate('/signin')}>로그인</PageAnchor>
        <PageAnchor onClick={() => navigate('/post')}>게시글 목록</PageAnchor>
      </AnchorContainer>
    </Container>
  );
}

export default Home;
