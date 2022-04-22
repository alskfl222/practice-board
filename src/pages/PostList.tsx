import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import signState from '../states/atom';
import { PostQueryType, PostEventType, PostType } from '../@types';
import { getPostList, deletePost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import SendButton from '../components/SendButton';

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
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
const PageContainer = styled.div`
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initQuery: PostQueryType = {
    postType: 'notice',
    pageSize: 10,
    page: 1,
    keyword: '',
  };
  const { isLogin } = JSON.parse(useRecoilValue(signState));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<PostQueryType>(initQuery);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [postList, setPostList] = useState<PostType[]>([]);
  const [message, setMessage] = useState<string>(messageType.loading);
  const totalPageCount = Math.ceil(totalCount / query.pageSize);

  function fetchPostList() {
    setIsLoading(true);
    getPostList(query)
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
  }

  const onChange = (type: keyof PostQueryType) => (e: PostEventType) => {
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
        '#keyword-input',
      ) as HTMLInputElement;
      value = keywordInput.value;
    }

    if (
      type === 'pageSize'
      && totalPageCount > Math.floor(totalCount / parseInt(value, 10))
    ) {
      console.log('Non-Exist Page');
      setQuery((beforeQuery) => ({
        ...beforeQuery,
        pageSize: parseInt(value, 10),
        page: Math.ceil(totalCount / parseInt(value, 10)),
      }));
    } else {
      setQuery((beforeQuery) => ({
        ...beforeQuery,
        [type]: Number.isNaN(value) ? parseInt(value, 10) : value,
      }));
    }

    const queryString = Object.entries(query)
      .map((item) =>
        (item[0] !== type ? `${item[0]}=${item[1]}` : `${type}=${value}`))
      .join('&');
    // console.log(queryString);
    setSearchParams(queryString);
  };

  function onDelete(id: PostType['id']) {
    console.log(id);
    deletePost(id)
      .then((response) => {
        console.log(response);
        fetchPostList();
      })
      .catch((err) => console.error(err));
  }

  function PageSizeSelect() {
    return (
      <select
        name='page-size'
        defaultValue={`${query.pageSize}`}
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
        defaultValue={`${query.postType}`}
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
  function clearQuery() {
    setQuery(initQuery);
    setSearchParams('');
  }

  useEffect(() => {
    fetchPostList();
  }, [searchParams]);

  return (
    <Container>
      <NavigationBar>게시판 목록</NavigationBar>
      <FilterContainer>
        <PageSizeSelect />
        <PostTypeSelect />
        <PostKeywordInput />
        <SendButton onClick={onChange('keyword')}>검색</SendButton>
        <SendButton onClick={clearQuery}>초기화</SendButton>
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
                  onClick={() => {
                    navigate(`/post/${post.id}`);
                  }}
                >
                  <PostIndexContainer>{post.id}</PostIndexContainer>
                  <PostTitleContainer>{post.title}</PostTitleContainer>
                  <PostControllerContainer>
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
                  </PostControllerContainer>
                </PostContainer>
              ))
              : message}
          </PostListContainer>
          <PageContainer>
            {new Array(totalPageCount).fill('').map((_, index) => (
              <PageAnchor
                className={index + 1 === query.page ? 'current' : ''}
                key={index + 1}
                onClick={onChange('page')}
              >
                {index + 1}
              </PageAnchor>
            ))}
            {isLogin ? (
              <PostAddButtonContainer>
                <SendButton onClick={() => navigate('/post/create')}>
                  글쓰기
                </SendButton>
              </PostAddButtonContainer>
            ) : null}
          </PageContainer>
        </>
      ) : (
        <PostListContainer>{message}</PostListContainer>
      )}
    </Container>
  );
}

export default PostList;
