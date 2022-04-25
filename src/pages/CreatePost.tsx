import React, { useState, useCallback, memo } from 'react';
import axios from 'axios';
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
import { navigateTo } from '../utils';

function CreatePost() {
  const initData: PostType = {
    title: '',
    contents: '',
    postType: 'notice',
  };
  const [data, setData] = useState<PostType>(initData);

  const isValid = !!(
    data.title.trim().length > 0 && data.contents.trim().length > 0
  );

  const onChange = useCallback(
    (type: keyof PostType) => (e: PostEventType) => {
      const { value } = e.target;
      setData((beforeData) => ({ ...beforeData, [type]: value }));
    },
    [],
  );

  const onSubmit = useCallback(() => {
    axios
      .post(`${process.env.API_URL}/post`, data, {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  }, []);

  const clearData = () => {
    setData(initData);
  };
  return (
    <PageContainer>
      <NavigationBar>게시글 생성</NavigationBar>
      <PostHeader>
        <SendButton minWidth='6rem' onClick={navigateTo('/post')}>
          게시글 목록
        </SendButton>
        <select onChange={onChange('postType')}>
          <option value='notice'>공지</option>
          <option value=''>일반</option>
        </select>
        <TitleInput
          value={data.title}
          placeholder='제목을 입력해주세요'
          onChange={onChange('title')}
        />
        <PostControllerContainer>
          <SendButton disabled={!isValid} onClick={onSubmit}>
            생성
          </SendButton>
          <SendButton onClick={clearData}>초기화</SendButton>
        </PostControllerContainer>
      </PostHeader>
      <PostBody>
        <PostContentTextarea
          value={data.contents}
          placeholder='내용을 입력해주세요'
          onChange={onChange('contents')}
        ></PostContentTextarea>
      </PostBody>
    </PageContainer>
  );
}

export default memo(CreatePost);
