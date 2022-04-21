import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { theme } from '../styles/theme';

const Container = styled.div``;

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <p>HOME PAGE</p>
      <button onClick={() => navigate('/signin')}>SIGNIN</button>
      <button onClick={() => navigate('/post')}>POST</button>
    </Container>
  );
}

export default Home;
