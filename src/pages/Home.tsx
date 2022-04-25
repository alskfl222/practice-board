import React, { memo } from 'react';
import styled from 'styled-components';
import { PageContainer, HorizonDivider } from '../styles';

const HomeHeader = styled.header`
  display: flex;
  align-items: center;
  height: 7rem;
`;
const HomeTitle = styled.h1`
  padding: 1rem;
  font-size: 3rem;
`;

const AnchorContainer = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const PageAnchor = styled.a`
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`;

function Home() {
  return (
    <PageContainer padding='2rem' alignItems='center'>
      <HomeHeader>
        <HomeTitle>홈페이지</HomeTitle>
      </HomeHeader>
      <HorizonDivider />
      <AnchorContainer>
        <PageAnchor href='/signin'>로그인</PageAnchor>
        <PageAnchor href='/post'>게시글 목록</PageAnchor>
      </AnchorContainer>
    </PageContainer>
  );
}

export default memo(Home);
