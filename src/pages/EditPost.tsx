import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostType, PostEventType } from '../@types';
import { getPost, editPost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import InputTextLine from '../components/InputTextLine';

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

function EditPost() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const initData: PostType = {
    title: '',
    contents: '',
  };
  const [postData, setPostData] = useState<PostType>(initData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function fetchPost() {
    getPost(id!)
      .then((response) => {
        // console.log(response.data);
        if (response.data!.post) {
          setPostData(response.data!.post);
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
    setPostData((beforeData) => ({ ...beforeData, [type]: value }));
  };

  const onSubmit = () => {
    console.log(postData);
    editPost(postData)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Container>
      <NavigationBar>게시글 수정</NavigationBar>
      <div>
        <button onClick={() => navigate('/post')}>게시글 목록</button>
      </div>
      {!isLoading ? (
        <>
          <PageHeader>
            <PostControllerContainer>
              <InputTextLine
                value={postData.title}
                onChange={onChange('title')}
              />
              <button onClick={onSubmit}>수정</button>
            </PostControllerContainer>
          </PageHeader>
          <PageBody>
            <PostContentTextarea
              value={postData.contents}
              onChange={onChange('contents')}
            ></PostContentTextarea>
          </PageBody>
        </>
      ) : (
        <p>게시글을 불러오고 있습니다</p>
      )}
    </Container>
  );
}

export default EditPost;
