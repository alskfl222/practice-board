import React, { useEffect, useState, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { PostType } from '../@types';
import NavigationBar from '../components/NavigationBar';
import {
  PageContainer,
  SendButton,
  PostHeader,
  PostControllerContainer,
  PostBody,
} from '../styles';

const PostTitle = styled.h2`
  flex-grow: 1;
  padding: 0 2rem;
  text-align: center;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PostContentHeader = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;
const PostContentBody = styled.div`
  padding: 2rem;
  padding-bottom: 40%;
  border: 1px solid black;
  border-radius: 1rem;
`;

function Post() {
  const params = useParams();
  const id = params.id as string;
  const navigate = useNavigate();
  const [data, setData] = useState<PostType>({
    id: '0',
    title: '불러오는 중입니다',
    contents: '불러오는 중입니다',
    author: '불러오는 중입니다',
    createdAt: new Date().toString(),
  });
  const dateString = new Date(
    data.createdAt || '9999-99-99'
  ).toLocaleDateString();

  function fetchPost() {
    axios
      .get(`${process.env.API_URL}/post/${id}`)
      .then((response) => {
        if (response.data && response.data.post) {
          setData(response.data.post);
        } else {
          navigate('/post');
        }
      })
      .catch((err) => {
        console.error(err);
        navigate('/post');
      });
  }

  function onDelete() {
    axios
      .post(
        `${process.env.API_URL}/post/delete`,
        { id },
        {
          headers: {
            token: localStorage.getItem('token') || '',
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate('/post');
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (Number.isNaN(+id)) {
      navigate('/404');
    }
    fetchPost();
  }, []);

  return (
    <PageContainer>
      <NavigationBar>게시글</NavigationBar>
      <PostHeader>
        <SendButton minWidth='6rem' onClick={() => navigate('/post')}>
          게시글 목록
        </SendButton>
        <PostTitle>{data.title}</PostTitle>
        <PostControllerContainer>
          <SendButton onClick={() => navigate(`/post/edit/${id}`)}>
            수정
          </SendButton>
          <SendButton onClick={onDelete}>삭제</SendButton>
        </PostControllerContainer>
      </PostHeader>
      <PostBody>
        <PostContentHeader>
          <div>{data.author}</div> <div>{dateString}</div>
        </PostContentHeader>
        <PostContentBody>{data.contents}</PostContentBody>
      </PostBody>
    </PageContainer>
  );
}

export default memo(Post);
