import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const MessageContainer = styled.div`
  padding-top: 5rem;
  height: calc(100vh - 10rem);
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
`;

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate('/'), 2000);
  }, []);
  return (
    <Container>
      <NavigationBar>404</NavigationBar>
      <MessageContainer>
        페이지를 찾을 수 없습니다 <br />
        잠시 후 홈으로 이동합니다
      </MessageContainer>
    </Container>
  );
}

export default NotFound;
