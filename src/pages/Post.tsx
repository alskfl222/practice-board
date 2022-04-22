import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PostType } from '../@types';
import signState from '../states/atom';
import { getPost } from '../apis';

function Post() {
  const userJSON = useRecoilValue(signState);
  const { isLogin } = JSON.parse(userJSON);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostType>({
    id: 0,
    title: '',
    contents: '',
    author: '',
    createdAt: new Date().toString(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(isLogin, id);

  function fetchPost() {
    getPost(id!)
      .then((response) => {
        // console.log(response.data);
        if (response.data!.post) {
          setPostData(response.data!.post);
          setIsLoading(false);
        } else {
          navigate('/post');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(typeof postData.createdAt);
  const dateString = new Date(postData.createdAt!).toLocaleDateString();

  return (
    <div>
      Post PAGE <br />
      <button onClick={() => navigate('/post')}>POST LIST</button>
      {!isLoading ? (
        <div>
          <div>
            <div>{postData.author}</div> <div>{dateString}</div>
          </div>
          <div>{postData.contents}</div>
        </div>
      ) : (
        '내용을 불러오고 있습니다'
      )}
    </div>
  );
}

export default Post;
