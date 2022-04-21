import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { signState } from '../states/atom';
import { NavigationBarType } from '../@types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
`;
const NavigationTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavigationBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
        <a onClick={() => navigate('/')}>HOME</a>
        {isLogin ? (
          <button
            onClick={() => {
              setUser(JSON.stringify({ isLogin: false }));
              localStorage.removeItem('token')
            }}
          >
            LOGOUT
          </button>
        ) : !(pathname === '/signin' || pathname === '/signup') ? (
          <button onClick={() => navigate('/signin')}>LOGIN</button>
        ) : null}
      </NavigationTop>
      <NavigationBottom>{props.children}</NavigationBottom>
    </Container>
  );
}

export default NavigationBar;
