import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import signState from '../states/atom';
import { PostType, PostEventType } from '../@types';
import NavigationBar from '../components/NavigationBar';
import SendButton from '../components/SendButton';
import { theme } from '../styles/theme';
import {
  PageContainer,
  PostHeader,
  TitleInput,
} from '../styles';

const PostControllerContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;
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
const PostContentTextarea = styled.textarea`
  width: 100%;
  height: 20rem;
  padding: 2rem;
  border-radius: 1rem;
`;

function EditPost() {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '-1', 10);
  const isLogin = useRecoilValue(signState);
  const initData: PostType = {
    id: 0,
    title: '불러오는 중입니다',
    contents: '불러오는 중입니다',
    author: '불러오는 중입니다',
    createdAt: new Date().toString(),
  };
  const [data, setData] = useState<PostType>(initData);
  const dateString = new Date(
    data.createdAt || '9999-99-99',
  ).toLocaleDateString();

  const isValid = !!(
    data.title.trim().length > 0 && data.contents.trim().length > 0
  );

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
      });
  }

  const onChange = useCallback(
    (type: keyof PostType) => (e: PostEventType) => {
      const { value } = e.target;
      setData((beforeData) => ({ ...beforeData, [type]: value }));
    },
    [],
  );

  const onSubmit = useCallback(() => {
    axios
      .post(`${process.env.API_URL}/post/edit`, data, {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      })
      .catch((err) => {
        console.error(err);
      });
    navigate('/post');
  }, []);

  useEffect(() => {
    // if (!isLogin) {
    //   navigate('/post');
    // }
    // fetchPost();
  }, []);

  return (
    <PageContainer>
      <NavigationBar>게시글 수정</NavigationBar>
      <PostHeader>
        <SendButton minWidth='6rem' onClick={() => navigate('/post')}>
          게시글 목록
        </SendButton>
        <PostControllerContainer>
          <TitleInput
            value={data.title}
            placeholder='제목을 입력해주세요'
            onChange={onChange('title')}
          />
          <SendButton disabled={!isValid} onClick={onSubmit}>
            수정
          </SendButton>
        </PostControllerContainer>
      </PostHeader>
      <PageBody>
        <PostContentHeader>
          <div>{data.author}</div> <div>{dateString}</div>
        </PostContentHeader>
        <PostContentTextarea
          value={data.contents}
          placeholder='내용을 입력해주세요'
          onChange={onChange('contents')}
        ></PostContentTextarea>
      </PageBody>
    </PageContainer>
  );
}

export default memo(EditPost);
