import React, { memo } from 'react';
import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';

import styled from 'styled-components';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PostList from './pages/PostList';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Post from './pages/Post';

import { theme } from './styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${theme.background.baseColor};
  overflow-x: hidden;
`;
const Inner = styled.div`
  width: calc(100vw - 2rem);
  min-width: calc(720px - 2rem);
  max-width: 1080px;
  min-height: 100vh;
  background-color: ${theme.background.brightGray};
`;

function App() {
  return (
    <RecoilRoot>
      <Container>
        <Inner>
          <Routes>
            <Route index element={<Home />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='post' element={<PostList />} />
            <Route path='post/create' element={<CreatePost />} />
            <Route path='post/edit/:id' element={<EditPost />} />
            <Route path='post/:id' element={<Post />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Inner>
      </Container>
    </RecoilRoot>
  );
}

export default memo(App);
