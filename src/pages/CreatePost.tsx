import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostType, PostEventType } from '../@types';
import { createPost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import SendButton from '../components/SendButton';
import { PageContainer, PostHeader, HorizonDivider, TitleInput, PostBody } from '../styles';

// * rendering 최적화 중심 refactoring
// ! styled-components 중복 관리
// ! useCallback, useMemo 사용
// ! 함수 쪼개기
// ! onClick 익명함수 x

const PostControllerContainer = styled.div`
  width: 80%;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const PostContentTextarea = styled.textarea`
  width: 100%;
  height: 20rem;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
`;

function CreatePost() {
  const navigate = useNavigate();
  const initData: PostType = {
    title: '',
    contents: '',
    postType: 'notice',
  };
  const [data, setData] = useState<PostType>(initData);

  const isValid = !!(
    data.title.trim().length > 0 && data.contents.trim().length > 0
  );

  const onChange = (type: string) => (e: PostEventType) => {
    const { value } = e.target;
    setData((beforeData) => ({ ...beforeData, [type]: value }));
  };

  const onSubmit = () => {
    console.log(data);
    createPost(data)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  };

  const clearData = () => {
    setData(initData);
  };
  return (
    <PageContainer>
      <NavigationBar>게시글 생성</NavigationBar>
      <PostHeader>
        <SendButton onClick={() => navigate('/post')}>게시글 목록</SendButton>
        <PostControllerContainer>
          <select onChange={onChange('postType')}>
            <option value='notice'>공지</option>
            <option value=''>일반</option>
          </select>
          <TitleInput
            value={data.title}
            placeholder='제목을 입력해주세요'
            onChange={onChange('title')}
          />
          <SendButton disabled={!isValid} onClick={onSubmit}>
            생성
          </SendButton>
          <SendButton onClick={clearData}>초기화</SendButton>
        </PostControllerContainer>
      </PostHeader>
      <HorizonDivider />
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
