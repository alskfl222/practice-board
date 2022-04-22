import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostType, PostEventType } from '../@types';
import { createPost } from '../apis';
import NavigationBar from '../components/NavigationBar';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const PageHeader = styled.div`
  padding: 2rem;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
const PostButton = styled.button`
  flex-shrink: 0;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: transparent;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: default;
    &:hover {
      background-color: #ccc;
    }
  }
  &:hover {
    background-color: #0003;
  }
`;
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

  const isValid =
    data.title.trim().length > 0 && data.contents.trim().length > 0
      ? true
      : false;

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
    <Container>
      <NavigationBar>게시글 생성</NavigationBar>
      <PageHeader>
        <PostButton onClick={() => navigate('/post')}>게시글 목록</PostButton>
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
          <PostButton disabled={!isValid} onClick={onSubmit}>
            생성
          </PostButton>
          <PostButton onClick={clearData}>초기화</PostButton>
        </PostControllerContainer>
      </PageHeader>
      <HorizonDivider />
      <PageBody>
        <PostContentTextarea
          value={data.contents}
          placeholder='내용을 입력해주세요'
          onChange={onChange('contents')}
        ></PostContentTextarea>
      </PageBody>
    </Container>
  );
}

export default CreatePost;
