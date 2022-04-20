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
      <button onClick={() => navigate('/login')}>LOGIN</button>
    </Container>
  );
}

export default Home;
