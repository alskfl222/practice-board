import React from 'react';
import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CharCounter from './pages/CharCounter';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import Posts from './pages/Posts';
import Post from './pages/Post';

import styled from 'styled-components';
import { theme } from './styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;
const Inner = styled.div`
  width: 100vw;
  max-width: 900px;
  height: 100vh;
  min-height: 720px;
  background-color: ${theme.background.brightGray};
`;

function App() {
  return (
    <RecoilRoot>
      <Container>
        <Inner>
          <Routes>
            <Route index element={<Home />} />
            <Route path='counter' element={<CharCounter />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='posts' element={<Posts />} />
            <Route path='posts/:id' element={<Post />} />
            {/* nested? */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Inner>
      </Container>
    </RecoilRoot>
  );
}

export default App;
