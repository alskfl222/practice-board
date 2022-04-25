import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostType, PostEventType } from '../@types';
import { createPost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import SendButton from '../components/SendButton';
import { PageContainer, PostHeader } from '../styles';

// * rendering 최적화 중심 refactoring
// ! styled-components 중복 관리
// ! useCallback, useMemo 사용
// ! 함수 쪼개기
// ! onClick 익명함수 x

const PostControllerContainer = styled.div`  
  width: 70%;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
const TitleInput = styled.input`
  flex-grow: 1;
  min-width: 0;
  padding: 0.2rem;
  padding-left: 1rem;
`;
const HorizonDivider = styled.div`
  align-self: center;
  width: 80%;
  margin: 2rem 0;
  box-shadow: 0 0.5px 0 0.5px black;
`;
const PageBody = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
`;
const PostContentTextarea = styled.textarea`
  width: 100%;
  height: 20rem;
  padding: 2rem;
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

  const isValid = !!(data.title.trim().length > 0 && data.contents.trim().length > 0);

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
      <PageBody>
        <PostContentTextarea
          value={data.contents}
          placeholder='내용을 입력해주세요'
          onChange={onChange('contents')}
        ></PostContentTextarea>
      </PageBody>
    </PageContainer>
  );
}

export default CreatePost;
