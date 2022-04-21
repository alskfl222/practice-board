import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../states/atom';
import styled from 'styled-components';

function Post() {
  const userJSON = useRecoilValue(loginState);
  const { isLogin } = JSON.parse(userJSON);
  const navigate = useNavigate();
  console.log(isLogin);
  return (
    <div>
      Post PAGE <br />
      <button onClick={() => navigate('/post')}>POST LIST</button>
    </div>
  );
}

export default Post;
