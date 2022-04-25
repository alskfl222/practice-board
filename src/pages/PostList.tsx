import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import signState from '../states/atom';
import { PostQueryType, PostEventType, PostType } from '../@types';
import NavigationBar from '../components/NavigationBar';
import PostListHeader from '../components/PostListHeader';
import { PageContainer, SendButton, HorizonDivider, PostBody } from '../styles';
import { navigateTo } from '../utils';
import PostListFooter from '../components/PostListFooter';
import PostListBody from '../components/PostListBody';

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

  useEffect(() => {
    fetchPostList();
  }, [location]);

  return (
    <PageContainer>
      <NavigationBar>게시판 목록</NavigationBar>
      <PostListHeader query={query} onChange={onChange} />
      <PostListBody
        isLoading={isLoading}
        postList={postList}
        isLogin={isLogin}
        message={message}
        onDelete={onDelete}
      />
      <PostListFooter
        totalPageCount={totalPageCount}
        query={query}
        onChange={onChange}
        isLogin={isLogin}
      />
    </PageContainer>
  );
}

export default memo(PostList);
