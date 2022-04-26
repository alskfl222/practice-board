import React, { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import signState from '../states/atom';

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
const NavButton = styled.button`
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

function NavigationBar(props: { children?: string }) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(signState);
  const { isLogin } = JSON.parse(user);
  return (
    <Container>
      <NavigationTop>
        <NavButton onClick={() => navigate('/')}>홈</NavButton>
        {isLogin && pathname !== '/signin' && (
          <NavButton
            onClick={() => {
              setUser(JSON.stringify({ isLogin: false }));
              localStorage.removeItem('token');
              navigate('/')
            }}
          >
            로그아웃
          </NavButton>
        )}
        {!isLogin && !(pathname === '/signin' || pathname === '/signup') && (
          <NavButton onClick={() => navigate('/signin')}>로그인</NavButton>
        )}
      </NavigationTop>
      <NavigationBottom>{props.children}</NavigationBottom>
    </Container>
  );
}

export default NavigationBar;
