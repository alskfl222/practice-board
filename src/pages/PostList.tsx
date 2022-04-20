import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostQueryType, PostType } from '../@types';
import { getPostList } from '../apis';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const FilterContainer = styled.div`
  padding: 1rem 0;
`;
const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const PageContainer = styled.div`
  display: flex;
`;

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<PostQueryType>({
    postType: searchParams.get('postType') || 'notice',
    pageSize: searchParams.get('pageSize')
      ? parseInt(searchParams.get('pageSize')!)
      : 10,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
  });
  const [postList, setPostList] = useState<PostType[]>([]);

  function fetchPosts() {
    getPostList(query)
      .then((response) => {
        console.log(response.data);
        setPostList(response.data!.posts);
      })
      .catch((err) => console.error(err));
  }
  const onChange =
    (type: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      // setQuery((state) => {
      //   return { ...query, pageSize: value };
      // });
      const queryString = Object.entries(query)
        .map((item) => {
          return item[0] !== type
            ? `${item[0]}=${item[1]}`
            : `${type}=${value}`;
        })
        .join('&');
      console.log(queryString);
      setSearchParams(queryString);
    };

  // useEffect(() => {
  //   fetchPosts();
  // }, [searchParams]);

  return (
    <Container>
      <PageTitle>PostList PAGE</PageTitle>
      <FilterContainer>
        <select name='pagesize' defaultValue='10' onChange={onChangePageSize}>
          <optgroup label='PageSize'>
            <option value='5'>5개</option>
            <option value='10'>10개</option>
          </optgroup>
        </select>
      </FilterContainer>
      <PostListContainer>
        {postList.map((post) => {
          return (
            <div>
              {post.id} - {post.title}
            </div>
          );
        })}
      </PostListContainer>
      <PageContainer></PageContainer>
    </Container>
  );
}

export default PostList;
