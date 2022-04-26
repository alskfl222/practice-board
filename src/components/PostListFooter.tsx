import React, { memo } from 'react';
import styled from 'styled-components';
import { PostListFooterProps } from '../@types';
import { SendButton } from '../styles';
import { navigateTo } from '../utils';

const PageButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const PageButton = styled.button`
  border: none;
  background-color: transparent;
  &:hover {
    background-color: #0003;
  }
  &.current {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;
const PostAddButtonContainer = styled.div`
  position: absolute;
  right: 5rem;
  z-index: 9999;
`;

function PostListFooter(props: PostListFooterProps) {
  const { totalPageCount, query, onChange, isLogin } = props;
  return (
    <PageButtonContainer>
      {new Array(totalPageCount).fill('').map((_, index) => (
        <PageButton
          className={`${index + 1}` === query.get('page') ? 'current' : ''}
          key={index + 1}
          onClick={onChange('page')}
        >
          {index + 1}
        </PageButton>
      ))}
      {isLogin ? (
        <PostAddButtonContainer>
          <SendButton onClick={navigateTo('/post/create')}>글쓰기</SendButton>
        </PostAddButtonContainer>
      ) : null}
    </PageButtonContainer>
  );
}

export default memo(PostListFooter);
