import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import signState from '../states/atom';
import { PostQueryType, PostEventType, PostType } from '../@types';
import NavigationBar from '../components/NavigationBar';
import PostListHeader from '../components/PostListHeader';
import PostListBody from '../components/PostListBody';
import PostListFooter from '../components/PostListFooter';
import { PageContainer } from '../styles';
import dummyPostList from '../temp/dummyData';

const messageType = {
  loading: '게시글을 불러오고 있습니다',
  noPost: '게시글이 없습니다',
  error: '문제가 발생했습니다',
};

function PostList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogin } = JSON.parse(useRecoilValue(signState));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postList, setPostList] = useState<PostType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [message, setMessage] = useState<string>(messageType.loading);



  const { search } = location;
  const initQuery = new URLSearchParams(search);
  const query = new URLSearchParams({
    postType: initQuery.get('postType') || 'notice',
    pageSize: initQuery.get('pageSize') || '10',
    page: initQuery.get('page') || '1',
    keyword: initQuery.get('keyword') || '',
  });

  const totalPageCount = Math.ceil(
    totalCount / parseInt(query.get('pageSize')!, 10),
  );

  const fetchPostList = useCallback(() => {
    setMessage(messageType.loading);
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
        setPostList(dummyPostList);
        setMessage(messageType.error);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  const onChange = useCallback(
    (type: keyof PostQueryType) => (e: PostEventType) => {
      e.preventDefault();
      setMessage(messageType.loading);
      let value = '';
      if (type === 'pageSize' || type === 'postType') {
        value = e.target.value;
      }
      if (type === 'page') value = e.target.innerText;
      if (type === 'keyword') {
        const keywordInput = document.querySelector(
          '#keyword-input',
        ) as HTMLInputElement;
        value = keywordInput.value;
      }

      if (
        type === 'pageSize'
        && totalPageCount > Math.floor(totalCount / parseInt(value, 10))
      ) {
        query.set('pageSize', value);
        query.set(
          'page',
          Math.ceil(totalCount / parseInt(value, 10)).toString(),
        );
      } else {
        query.set(type, value);
      }
      const queryString = query.toString();
      navigate(`/post?${queryString}`);
    },
    [],
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
        },
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
        isLogin={isLogin}
        isLoading={isLoading}
        postList={postList}
        message={message}
        onDelete={onDelete}
      />
      <PostListFooter
        isLogin={isLogin}
        totalPageCount={totalPageCount}
        query={query}
        onChange={onChange}
      />
    </PageContainer>
  );
}

export default PostList;
