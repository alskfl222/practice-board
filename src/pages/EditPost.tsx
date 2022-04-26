import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import signState from '../states/atom';
import { PostType, PostEventType } from '../@types';
import NavigationBar from '../components/NavigationBar';
import {
  PageContainer,
  SendButton,
  PostHeader,
  TitleInput,
  PostControllerContainer,
  PostBody,
  PostContentTextarea,
} from '../styles';

const PostContentHeader = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

function EditPost() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id as string;
  const isLogin = useRecoilValue(signState);
  const initData: PostType = {
    id: '0',
    title: '불러오는 중입니다',
    contents: '불러오는 중입니다',
    author: '불러오는 중입니다',
    createdAt: new Date().toString(),
  };
  const [data, setData] = useState<PostType>(initData);
  const dateString = new Date(
    data.createdAt || '9999-99-99'
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
        navigate('/post');
      });
  }

  const onChange = useCallback(
    (type: keyof PostType) => (e: PostEventType) => {
      const { value } = e.target;
      setData((beforeData) => ({ ...beforeData, [type]: value }));
    },
    []
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
    if (!isLogin) {
      navigate('/signin');
    }
    if (Number.isNaN(+id)) {
      navigate('/404');
    }
    fetchPost();
  }, []);

  return (
    <PageContainer>
      <NavigationBar>게시글 수정</NavigationBar>
      <PostHeader>
        <SendButton minWidth='6rem' onClick={() => navigate('/post')}>
          게시글 목록
        </SendButton>
        <TitleInput
          value={data.title}
          placeholder='제목을 입력해주세요'
          onChange={onChange('title')}
        />
        <PostControllerContainer>
          <SendButton disabled={!isValid} onClick={onSubmit}>
            수정
          </SendButton>
        </PostControllerContainer>
      </PostHeader>
      <PostBody>
        <PostContentHeader>
          <div>{data.author}</div> <div>{dateString}</div>
        </PostContentHeader>
        <PostContentTextarea
          value={data.contents}
          placeholder='내용을 입력해주세요'
          onChange={onChange('contents')}
        ></PostContentTextarea>
      </PostBody>
    </PageContainer>
  );
}

export default memo(EditPost);
