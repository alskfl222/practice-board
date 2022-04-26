import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostBody, HorizonDivider, SendButton } from '../styles';
import { PostListBodyProps } from '../@types';
import { navigateTo } from '../utils';

const PostListColumnHeader = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const PostContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  &:hover {
    background-color: #0003;
  }
`;
const PostIndexContainer = styled.div`
  flex-shrink: 0;
  width: 5rem;
  padding-right: 1rem;
  border-right: 1px solid black;
  text-align: center;
`;
const PostTitleContainer = styled.div`
  position: relative;
  flex-grow: 1;
  min-width: 10rem;
  z-index: 99;
  padding: 0 2rem;
  text-align: center;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const PostAuthorContainer = styled.div`
  flex-shrink: 0;
  width: 7.5rem;
  padding: 0 1rem;
  border-left: 1px solid black;
  border-right: 1px solid black;
  text-align: center;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const PostControllerContainer = styled.div`
  position: relative;
  flex-shrink: 0.5;
  width: 7.5rem;
  z-index: 999;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

function PostListBody(props: PostListBodyProps) {
  const { isLoading, postList, isLogin, message, onDelete } = props;
  const navigate = useNavigate();

  return (
    <PostBody border='1px solid black'>
      <PostListColumnHeader>
        <PostIndexContainer>번호</PostIndexContainer>
        <PostTitleContainer>제목</PostTitleContainer>
        <PostAuthorContainer>작성자</PostAuthorContainer>
        <PostControllerContainer></PostControllerContainer>
      </PostListColumnHeader>
      <HorizonDivider width='100%' margin='0' />
      {!isLoading ? (
        <>
          {postList.length !== 0
            ? postList.map((post) => (
              <PostContainer
                key={post.id}
                onClick={navigateTo(`/post/${post.id}`)}
              >
                <PostIndexContainer>{post.id}</PostIndexContainer>
                <PostTitleContainer>{post.title}</PostTitleContainer>
                <PostAuthorContainer>{post.author}</PostAuthorContainer>
                <PostControllerContainer>
                  {isLogin ? (
                    <>
                      <SendButton
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          navigate(`/post/edit/${post.id}`);
                        }}
                      >
                          수정
                      </SendButton>
                      <SendButton
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          onDelete(post.id);
                        }}
                      >
                          삭제
                      </SendButton>
                    </>
                  ) : (
                    <div></div>
                  )}
                </PostControllerContainer>
              </PostContainer>
            ))
            : message}
        </>
      ) : (
        message
      )}
    </PostBody>
  );
}

export default memo(PostListBody);
