import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import signState from '../states/atom';
import { PostQueryType, PostEventType, PostType } from '../@types';
import { getPostList, deletePost } from '../apis';
import NavigationBar from '../components/NavigationBar';

const Container = styled.div`
  width: 100%;
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
  }
`;
const KeywordInput = styled.input`
  flex-grow: 1;
  min-width: 0;
`;
const FilterButton = styled.button`
  flex-shrink: 0;
  width: 3rem;
`;
const PostListContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
`;
const PostContainer = styled.div`
  &:hover {
    background-color: #0003;
  }
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<PostQueryType>(initQuery);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [postList, setPostList] = useState<PostType[]>([]);
  const totalPageCount = Math.ceil(totalCount / query.pageSize);

  function fetchPostList() {
    setIsLoading(true);
    getPostList(query)
      .then((response) => {
        // console.log(response.data);
        if (response.data!.posts) {
          setPostList(response.data!.posts);
          setTotalCount(response.data!.totalCount || 1);
        } else {
          setPostList([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  const onChange = (type: keyof PostQueryType) => (e: PostEventType) => {
    e.preventDefault();
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
      && totalPageCount > Math.floor(totalCount / parseInt(value))
    ) {
      console.log('Non-Exist Page');
      setQuery((beforeQuery) => ({
        ...beforeQuery,
        pageSize: parseInt(value),
        page: Math.ceil(totalCount / parseInt(value)),
      }));
    } else {
      setQuery((beforeQuery) => ({
        ...beforeQuery,
        [type]: Number.isNaN(value) ? parseInt(value) : value,
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
  console.log(isLogin);

  return (
    <Container>
      <NavigationBar>게시판 목록</NavigationBar>
      <FilterContainer>
        <PageSizeSelect />
        <PostTypeSelect />
        <PostKeywordInput />
        <FilterButton onClick={onChange('keyword')}>검색</FilterButton>
        <FilterButton onClick={clearQuery}>초기화</FilterButton>
      </FilterContainer>
      {isLogin ? (
        <div>
          <button onClick={() => navigate('/post/create')}>글쓰기</button>
        </div>
      ) : null}
      {!isLoading ? (
        <>
          <PostListContainer>
            {postList.length !== 0
              ? postList.map((post) => (
                <PostContainer
                  key={post.id}
                  onClick={() => {
                    navigate(`/post/${post.id}`);
                  }}
                >
                  {post.id} - {post.title} -{' '}
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      navigate(`/post/edit/${post.id}`);
                    }}
                  >
                      수정
                  </button>
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      onDelete(post.id);
                    }}
                  >
                      삭제
                  </button>
                </PostContainer>
              ))
              : '게시 글이 없습니다'}
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
          </PageContainer>
        </>
      ) : (
        <PostListContainer>게시글을 불러오는 중입니다</PostListContainer>
      )}
    </Container>
  );
}

export default PostList;
