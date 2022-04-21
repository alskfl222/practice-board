import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PostQueryType, PostEventType, PostType } from '../@types';
import { getPostList, deletePost } from '../apis';
import NavigationBar from '../components/NavigationBar';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const FilterContainer = styled.div`
  display: flex;
`;
const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initQuery: PostQueryType = {
    postType: 'notice',
    pageSize: 10,
    page: 1,
    keyword: '',
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<PostQueryType>(initQuery);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [postList, setPostList] = useState<PostType[]>([]);
  const totalPageCount = Math.ceil(totalCount / query.pageSize);

  function fetchPostList() {
    setIsLoading(true);
    getPostList(query)
      .then((response) => {
        console.log(response.data);
        if (response.data!.posts) {
          setPostList(response.data!.posts);
          setTotalCount(response.data!.totalCount || 1);
        } else {
          setPostList([]);
        }
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }

  const onChange = (type: keyof PostQueryType) => (e: PostEventType) => {
    e.preventDefault();
    setIsLoading(true);
    let value: string = '';
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
    console.log(e, e.target, e.target.tagName, value);
    setQuery((state) => ({ ...query, [type]: value }));
    const queryString = Object.entries(query)
      .map((item) =>
        item[0] !== type ? `${item[0]}=${item[1]}` : `${type}=${value}`
      )
      .join('&');
    // console.log(queryString);
    setSearchParams(queryString);
  };

  function onDelete(id: PostType['id']) {
    console.log(id);
    deletePost(id)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  function PageSizeSelect() {
    return (
      <select
        name='page-size'
        defaultValue={`${query.pageSize}`}
        onChange={onChange('pageSize')}
      >
        <optgroup label='PageSize'>
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
        <optgroup label='PostType'>
          <option value='notice'>notice</option>
        </optgroup>
      </select>
    );
  }
  function PostKeywordInput() {
    return (
      <input
        id='keyword-input'
        placeholder='검색어'
        onKeyUp={(e: PostEventType) => {
          if (e.key === 'Enter') {
            onChange('keyword')(e);
          }
        }}
      ></input>
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
      <NavigationBar>PostList PAGE</NavigationBar>
      <FilterContainer>
        <PageSizeSelect />
        <PostTypeSelect />
        <PostKeywordInput />
        <button onClick={onChange('keyword')}>Search</button>
        <button onClick={clearQuery}>Clear</button>
      </FilterContainer>
      <div>
        <button onClick={() => navigate('/post/create')}>
          CreatePost Page
        </button>
      </div>
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
                      EDIT
                    </button>
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        onDelete(post.id);
                      }}
                    >
                      DELETE
                    </button>
                  </PostContainer>
                ))
              : '게시 글이 없습니다'}
          </PostListContainer>
          <PageContainer>
            {new Array(totalPageCount).fill('').map((_, index) => (
              <a key={index + 1} onClick={onChange('page')}>
                {index + 1}
              </a>
            ))}
          </PageContainer>
        </>
      ) : (
        '게시글을 불러오는 중입니다'
      )}
    </Container>
  );
}

export default PostList;
