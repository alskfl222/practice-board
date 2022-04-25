import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostType } from '../@types';
import { getPost, deletePost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import { theme } from '../styles/theme';
import { PageContainer, HorizonDivider, PostHeader, PostBody } from '../styles';
import SendButton from '../components/SendButton';

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
    data.createdAt || '9999-99-99'
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
        console.log(response);
        navigate('/post');
      })
      .catch((err) => console.error(err));
  }

  // useEffect(() => {
  //   fetchPost();
  // }, []);

  return (
    <PageContainer gap='2rem'>
      <NavigationBar>게시글</NavigationBar>
      <PostHeader>
        <SendButton onClick={() => navigate('/post')}>게시글 목록</SendButton>
        <PostTitle>{data.title}</PostTitle>
        <PostControllerContainer>
          <SendButton
            onClick={() => {
              navigate(`/post/edit/${id}`);
            }}
          >
            수정
          </SendButton>
          <SendButton onClick={onDelete}>삭제</SendButton>
        </PostControllerContainer>
      </PostHeader>
      <HorizonDivider />
      <PostBody>
        <PostContentHeader>
          <div>{data.author}</div> <div>{dateString}</div>
        </PostContentHeader>
        <HorizonDivider />
        <PostContentBody>{data.contents}</PostContentBody>
      </PostBody>
    </PageContainer>
  );
}

export default Post;
