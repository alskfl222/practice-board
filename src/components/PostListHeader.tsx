import React, { memo } from 'react';
import { PostHeader, TitleInput, SendButton } from '../styles';
import { PostListHeaderProps, PostEventType } from '../@types';

function PostListHeader(props: PostListHeaderProps) {
  const { query, onChange } = props;
  return (
    <PostHeader padding='1rem 2rem'>
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
      <select
        name='post-type'
        value={`${query.get('postType')}`}
        onChange={onChange('postType')}
      >
        <optgroup label='종류'>
          <option value='notice'>공지</option>
        </optgroup>
      </select>
      <TitleInput
        id='keyword-input'
        fontSize='1rem'
        defaultValue={`${query.get('keyword')}`}
        placeholder='검색어'
        onKeyUp={(e: PostEventType) => {
          if (e.key === 'Enter') {
            onChange('keyword')(e);
          }
        }}
      ></TitleInput>
      <SendButton onClick={onChange('keyword')}>검색</SendButton>
    </PostHeader>
  );
}

export default memo(PostListHeader);
