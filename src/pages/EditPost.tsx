import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostType, PostEventType } from '../@types';
import { getPost, editPost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import SendButton from '../components/SendButton';

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
const PostControllerContainer = styled.div`
  width: 70%;
  display: flex;
  gap: 1rem;
  justify-content: center;
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
  justify-content: center;
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
  const id = parseInt(params.id!);
  const initData: PostType = {
    title: '',
    contents: '',
  };
  const [data, setData] = useState<PostType>(initData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isValid = !!(
    data.title.trim().length > 0 && data.contents.trim().length > 0
  );

  function fetchPost() {
    getPost(id)
      .then((response) => {
        // console.log(response.data);
        if (response.data!.post) {
          setData(response.data!.post);
          setIsLoading(false);
        } else {
          navigate('/post');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const onChange = (type: string) => (e: PostEventType) => {
    const { value } = e.target;
    setData((beforeData) => ({ ...beforeData, [type]: value }));
  };

  const onSubmit = () => {
    console.log(data);
    editPost(data)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Container>
      <NavigationBar>게시글 수정</NavigationBar>
      <PageHeader>
        <SendButton onClick={() => navigate('/post')}>게시글 목록</SendButton>
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
      </PageHeader>
      <HorizonDivider />
      {!isLoading ? (
        <PageBody>
          <PostContentTextarea
            value={data.contents}
            placeholder='내용을 입력해주세요'
            onChange={onChange('contents')}
          ></PostContentTextarea>
        </PageBody>
      ) : (
        <p>게시글을 불러오고 있습니다</p>
      )}
    </Container>
  );
}

export default EditPost;
