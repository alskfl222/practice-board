import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import signState from '../states/atom';
import { PostQueryType, PostEventType, PostType } from '../@types';

import NavigationBar from '../components/NavigationBar';
import SendButton from '../components/SendButton';
import { PageContainer } from '../styles';
import { makeQueryString, navigateTo } from '../utils';

const FilterContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  select {
    width: 20%;
    padding: 0 0.2rem;
  }
`;
const KeywordInput = styled.input`
  flex-grow: 1;
  min-width: 0;
  padding: 0.2rem;
`;

const PostListContainer = styled.div`
  min-height: calc(100vh - 25rem);
  margin: 0 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
const PostListHeader = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`;
const HorizonDivider = styled.div`
  align-self: center;
  width: 100%;
  box-shadow: 0 0.5px 0 0.5px black;
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
  width: 4rem;
  border-right: 1px solid black;
  text-align: center;
`;
const PostTitleContainer = styled.div`
  position: relative;
  flex-grow: 1;
  z-index: 99;
  padding: 0 2rem;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const PostControllerContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;
const PageAnchorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  a:hover {
    background-color: #0003;
  }
`;
const PageAnchor = styled.a`
  &.current {
    font-weight: 700;
  }
`;
const PostAddButtonContainer = styled.div`
  position: absolute;
  right: 5rem;
  z-index: 9999;
`;
const messageType = {
  loading: '게시글을 불러오고 있습니다',
  noPost: '게시글이 없습니다',
  error: '문제가 발생했습니다',
};

function PostList() {
  const location = useLocation();
  const { search } = location;
  const initQuery = new URLSearchParams(search);
  const query = new URLSearchParams({
    postType: initQuery.get('postType') || 'notice',
    pageSize: initQuery.get('pageSize') || '10',
    page: initQuery.get('page') || '1',
    keyword: initQuery.get('keyword') || '',
  });
  const navigate = useNavigate();
  const { isLogin } = JSON.parse(useRecoilValue(signState));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [postList, setPostList] = useState<PostType[]>([]);
  const [message, setMessage] = useState<string>(messageType.loading);
  const totalPageCount = Math.ceil(
    totalCount / parseInt(query.get('pageSize')!, 10)
  );

  const fetchPostList = useCallback(() => {
    setIsLoading(true);
    const queryString = query.toString();
    axios
      .get(`${process.env.API_URL}/post?${queryString}`)
      .then((response) => {
        if (response.data && response.data.posts) {
          setPostList(response.data.posts);
          setTotalCount(response.data.totalCount || 1);
        } else {
          setPostList([]);
          setMessage(messageType.noPost);
        }
      })
      .catch((err) => {
        setMessage(messageType.error);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  const onChange = useCallback(
    (type: keyof PostQueryType) => (e: PostEventType) => {
      e.preventDefault();
      setMessage(messageType.loading);
      setIsLoading(true);
      let value = '';
      if (type === 'pageSize' || type === 'postType') {
        value = e.target.value;
      }
      if (type === 'page') value = e.target.innerText;
      if (type === 'keyword') {
        const keywordInput = document.querySelector(
          '#keyword-input'
        ) as HTMLInputElement;
        value = keywordInput.value;
      }

      if (
        type === 'pageSize' &&
        totalPageCount > Math.floor(totalCount / parseInt(value, 10))
      ) {
        query.set('pageSize', value);
        query.set(
          'page',
          Math.ceil(totalCount / parseInt(value, 10)).toString()
        );
      } else {
        query.set(type, value);
      }
      const queryString = query.toString();
      navigate(`/post?${queryString}`);
    },
    []
  );

  const onDelete = useCallback((id: PostType['id']) => {
    axios
      .post(
        `${process.env.API_URL}/post/delete`,
        { id },
        {
          headers: {
            token: localStorage.getItem('token') || '',
          },
        }
      )
      .then((response) => {
        console.log(response);
        fetchPostList();
      })
      .catch((err) => console.error(err));
  }, []);

  function PageSizeSelect() {
    return (
      <select
        name='page-size'
        value={`${query.get('pageSize')}`}
        onChange={onChange('pageSize')}
      >
        <optgroup label='페이지 개수'>
          <option value='5'>5개</option>
          <option value='10'>10개</option>
        </optgroup>
      </select>
    );
  }
  function PostTypeSelect() {
    return (
      <select
        name='post-type'
        value={`${query.get('postType')}`}
        onChange={onChange('postType')}
      >
        <optgroup label='종류'>
          <option value='notice'>공지</option>
        </optgroup>
      </select>
    );
  }
  function PostKeywordInput() {
    return (
      <KeywordInput
        id='keyword-input'
        placeholder='검색어'
        onKeyUp={(e: PostEventType) => {
          if (e.key === 'Enter') {
            onChange('keyword')(e);
          }
        }}
      ></KeywordInput>
    );
  }

  useEffect(() => {
    fetchPostList();
  }, [location]);

  return (
    <PageContainer>
      <NavigationBar>게시판 목록</NavigationBar>
      <FilterContainer>
        <PageSizeSelect />
        <PostTypeSelect />
        <PostKeywordInput />
        <SendButton onClick={onChange('keyword')}>검색</SendButton>
      </FilterContainer>
      {!isLoading ? (
        <>
          <PostListContainer>
            <PostListHeader>
              <PostIndexContainer>번호</PostIndexContainer>
              <PostTitleContainer>제목</PostTitleContainer>
              <PostControllerContainer></PostControllerContainer>
            </PostListHeader>
            <HorizonDivider />
            {postList.length !== 0
              ? postList.map((post) => (
                  <PostContainer
                    key={post.id}
                    onClick={navigateTo(`/post/${post.id}`)}
                  >
                    <PostIndexContainer>{post.id}</PostIndexContainer>
                    <PostTitleContainer>{post.title}</PostTitleContainer>
                    <PostControllerContainer>
                      {isLogin && (
                        <>
                          <SendButton
                            onClick={(
                              e: React.MouseEvent<HTMLButtonElement>
                            ) => {
                              e.stopPropagation();
                              navigate(`/post/edit/${post.id}`);
                            }}
                          >
                            수정
                          </SendButton>
                          <SendButton
                            onClick={(
                              e: React.MouseEvent<HTMLButtonElement>
                            ) => {
                              e.stopPropagation();
                              onDelete(post.id);
                            }}
                          >
                            삭제
                          </SendButton>
                        </>
                      )}
                    </PostControllerContainer>
                  </PostContainer>
                ))
              : message}
          </PostListContainer>
          <PageAnchorContainer>
            {new Array(totalPageCount).fill('').map((_, index) => (
              <PageAnchor
                className={
                  `${index + 1}` === query.get('page') ? 'current' : ''
                }
                key={index + 1}
                onClick={onChange('page')}
              >
                {index + 1}
              </PageAnchor>
            ))}
            {isLogin ? (
              <PostAddButtonContainer>
                <SendButton onClick={navigateTo('/post/create')}>
                  글쓰기
                </SendButton>
              </PostAddButtonContainer>
            ) : null}
          </PageAnchorContainer>
        </>
      ) : (
        <PostListContainer>{message}</PostListContainer>
      )}
    </PageContainer>
  );
}

export default PostList;
