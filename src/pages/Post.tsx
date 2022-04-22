import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostType } from '../@types';
import { getPost, deletePost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import { theme } from '../styles/theme';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const PostHeader = styled.header`
  padding: 2rem;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;
const ControlButton = styled.button`
  flex-shrink: 0;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #0003;
  }
`;
const PostTitle = styled.h2`
  flex-grow: 1;
  padding: 0 2rem;
  text-align: center;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const PostControllerContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
const HorizonDivider = styled.div`
  align-self: center;
  width: 80%;
  margin: 2rem 1rem 0;
  box-shadow: 0 0.5px 0 0.5px black;
`;
const PageBody = styled.div`
  width: calc(100% -4rem);
  min-height: 20rem;
  margin: 0 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: ${theme.background.white};
`;
const PostContentHeader = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;
const PostContentBody = styled.div`
  padding: 2rem;
`;

function Post() {
  const params = useParams();
  const id = parseInt(params.id || '-1', 10);
  const navigate = useNavigate();
  const [data, setData] = useState<PostType>({
    id: 0,
    title: '불러오는 중입니다',
    contents: '불러오는 중입니다',
    author: '불러오는 중입니다',
    createdAt: new Date().toString(),
  });
  const dateString = new Date(
    data.createdAt || '9999-99-99',
  ).toLocaleDateString();

  function fetchPost() {
    getPost(id)
      .then((response) => {
        if (response.data && response.data.post) {
          setData(response.data.post);
        } else {
          navigate('/post');
        }
      })
      .catch((err) => {
        console.error(err);
        navigate('/404');
      });
  }

  function onDelete() {
    deletePost(id)
      .then((response) => {
        navigate('/post');
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Container>
      <NavigationBar>게시글</NavigationBar>

      <PostHeader>
        <ControlButton onClick={() => navigate('/post')}>
          게시글 목록
        </ControlButton>
        <PostTitle>{data.title}</PostTitle>
        <PostControllerContainer>
          <ControlButton
            onClick={() => {
              navigate(`/post/edit/${id}`);
            }}
          >
            수정
          </ControlButton>
          <ControlButton onClick={onDelete}>삭제</ControlButton>
        </PostControllerContainer>
      </PostHeader>
      <HorizonDivider />
      <PageBody>
        <PostContentHeader>
          <div>{data.author}</div> <div>{dateString}</div>
        </PostContentHeader>
        <HorizonDivider />
        <PostContentBody>{data.contents}</PostContentBody>
      </PageBody>
    </Container>
  );
}

export default Post;
