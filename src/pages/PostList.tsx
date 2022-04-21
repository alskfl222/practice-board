import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostQueryType, PostType } from '../@types';
import { getPostList } from '../apis';
import NavigationBar from '../components/NavigationBar';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<PostQueryType>({
    postType: searchParams.get('postType') || 'notice',
    pageSize: searchParams.get('pageSize')
      ? parseInt(searchParams.get('pageSize')!)
      : 10,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
  });
  const [totalCount, setTotalCount] = useState<number>(1);
  const [postList, setPostList] = useState<PostType[]>([]);
  const totalPageCount = Math.ceil(totalCount / query.pageSize)

  function fetchPostList() {
    getPostList(query)
      .then((response) => {
        // console.log(response.data);
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

  const onChange =
    (type: string) =>
    (
      e: React.ChangeEvent<HTMLSelectElement> &
        React.MouseEvent<HTMLAnchorElement>
    ) => {
      e.preventDefault();
      console.log(e.target);
      const value = e.target.value ? e.target.value : e.target.innerText;
      setQuery((state) => ({ ...query, [type]: value }));
      const queryString = Object.entries(query)
        .map((item) =>
          item[0] !== type ? `${item[0]}=${item[1]}` : `${type}=${value}`
        )
        .join('&');
      // console.log(queryString);
      setSearchParams(queryString);
    };
  // console.log('Render!');

  function PageSizeSelect() {
    return (
      <select
        name='pagesize'
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
        name='postype'
        defaultValue={`${query.postType}`}
        onChange={onChange('postType')}
      >
        <optgroup label='PostType'>
          <option value='notice'>notice</option>
        </optgroup>
      </select>
    );
  }

  // useEffect(() => {
  //   fetchPostList();
  // }, [searchParams]);

  return (
    <Container>
      <NavigationBar>PostList PAGE</NavigationBar>
      <FilterContainer>
        <PageSizeSelect />
        <PostTypeSelect />
      </FilterContainer>
      {!isLoading ? (
        <>
          <PostListContainer>
            {postList.length !== 0
              ? postList.map((post) => (
                  <PostContainer
                    key={post.id}
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    {post.id} - {post.title}
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
