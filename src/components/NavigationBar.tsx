import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { signState } from '../states/atom';
import { NavigationBarType } from '../@types';
import styled from 'styled-components';

const Container = styled.div`
  height: 10rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  box-shadow: 0 0.5px 5px 0.5px #0003;
`;
const NavigationTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HomeAnchor = styled.a`
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`;
const SignButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`;
const NavigationBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 700;
`;

function NavigationBar(props: NavigationBarType) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(signState);
  const isLogin = JSON.parse(user).isLogin;
  const { pathname } = location;
  return (
    <Container>
      <NavigationTop>
        <HomeAnchor onClick={() => navigate('/')}>HOME</HomeAnchor>
        {isLogin ? (
          <SignButton
            onClick={() => {
              setUser(JSON.stringify({ isLogin: false }));
              localStorage.removeItem('token');
            }}
          >
            LOGOUT
          </SignButton>
        ) : !(pathname === '/signin' || pathname === '/signup') ? (
          <SignButton onClick={() => navigate('/signin')}>LOGIN</SignButton>
        ) : null}
      </NavigationTop>
      <NavigationBottom>{props.children}</NavigationBottom>
    </Container>
  );
}

export default NavigationBar;
