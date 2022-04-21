import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostType, PostEventType } from '../@types';
import { createPost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import InputTextLine from '../components/InputTextLine';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const PageHeader = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const PostControllerContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;
const PageBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const PostContentTextarea = styled.textarea`
  width: 100%;
  margin: 2rem;
`;

function CreatePost() {
  const navigate = useNavigate();
  const initData: PostType = {
    title: '',
    contents: '',
    postType: 'notice',
  };
  const [data, setData] = useState<PostType>(initData);

  const onChange = (type: string) => (e: PostEventType) => {
    const value: string = e.target.value;
    setData((state) => ({ ...data, [type]: value }));
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
      <NavigationBar>CreatePost Page</NavigationBar>
      <PageHeader>
        <div>
          <button onClick={() => navigate('/post')}>PostList Page</button>
        </div>
        <PostControllerContainer>
          <select onChange={onChange('postType')}>
            <option value='notice'>notice</option>
            <option value=''>normal</option>
          </select>
          <InputTextLine value={data.title} onChange={onChange('title')} />
          <button onClick={onSubmit}>CREATE</button>
          <button onClick={clearData}>CLEAR</button>
        </PostControllerContainer>
      </PageHeader>
      <PageBody>
        <PostContentTextarea
          value={data.contents}
          onChange={onChange('contents')}
        ></PostContentTextarea>
      </PageBody>
    </Container>
  );
}

export default CreatePost;
