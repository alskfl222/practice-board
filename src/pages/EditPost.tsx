import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import signState from '../states/atom';
import { PostType, PostEventType } from '../@types';
import { getPost, editPost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import SendButton from '../components/SendButton';
import { theme } from '../styles/theme';

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
    getPost(id)
      .then((response) => {
        // console.log(response.data);
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

  const onChange = (type: keyof PostType) => (e: PostEventType) => {
    const { value } = e.target;
    setData((beforeData) => ({ ...beforeData, [type]: value }));
  };

  const onSubmit = () => {
    editPost(data).catch((err) => {
      console.error(err);
    });
    navigate('/post');
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/post');
    }
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
      <PageBody>
        <PostContentHeader>
          <div>{data.author}</div> <div>{dateString}</div>
        </PostContentHeader>
        <HorizonDivider />
        <PostContentTextarea
          value={data.contents}
          placeholder='내용을 입력해주세요'
          onChange={onChange('contents')}
        ></PostContentTextarea>
      </PageBody>
    </Container>
  );
}

export default EditPost;
