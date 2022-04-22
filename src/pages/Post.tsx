import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PostType } from '../@types';
import signState from '../states/atom';
import { getPost, deletePost } from '../apis';
import NavigationBar from '../components/NavigationBar';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const PostHeader = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;
const ControlButton = styled.button`
  padding: .5rem 0;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #0003;
  }
`;
const PostContentContainer = styled.div``;
const PostContentHeader = styled.div``;
const PostContentBody = styled.div``;

function Post() {
  const userJSON = useRecoilValue(signState);
  const { isLogin } = JSON.parse(userJSON);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostType>({
    id: 0,
    title: '',
    contents: '',
    author: '',
    createdAt: new Date().toString(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(isLogin, id);

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
        navigate('/404');
      });
  }

  function onDelete(id: PostType['id']) {
    console.log(id);
    deletePost(id)
      .then((response) => {
        console.log(response);
        navigate('/post');
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(typeof postData.createdAt);
  const dateString = new Date(postData.createdAt!).toLocaleDateString();

  return (
    <Container>
      <NavigationBar>게시글</NavigationBar>
      <PostHeader>
        <ControlButton onClick={() => navigate('/post')}>
          게시글 목록으로
        </ControlButton>
        <div>
          <ControlButton
            onClick={() => {
              navigate(`/post/edit/${id}`);
            }}
          >
            수정
          </ControlButton>
          <ControlButton onClick={() => onDelete(parseInt(id!))}>
            삭제
          </ControlButton>
        </div>
      </PostHeader>
      {!isLoading ? (
        <PostContentContainer>
          <PostContentHeader>
            <div>{postData.author}</div> <div>{dateString}</div>
          </PostContentHeader>
          <PostContentBody>{postData.contents}</PostContentBody>
        </PostContentContainer>
      ) : (
        <p>내용을 불러오고 있습니다</p>
      )}
    </Container>
  );
}

export default Post;
