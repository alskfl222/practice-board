import React from 'react';
import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';

import styled from 'styled-components';
import Home from './pages/Home';
import CharCounter from './pages/CharCounter';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import PostList from './pages/PostList';
import Post from './pages/Post';

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
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='post' element={<PostList />} />
            <Route path='post/:id' element={<Post />} />
            {/* nested? */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Inner>
      </Container>
    </RecoilRoot>
  );
}

export default App;
