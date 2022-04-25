import axios from 'axios';
import {
  PostQueryType,
  PostType,
  PostResponseType,
} from '../@types';

// ! api 분리

// axios.defaults.headers.post.token = localStorage.getItem('token') || '';


export function getPostList(query: PostQueryType): Promise<PostResponseType> {
  const queryString = Object.entries(query)
    .map((item) => `${item[0]}=${item[1]}`)
    .join('&');
  return axios
    .get(`${process.env.API_URL}/post?${queryString}`)
}

export function getPost(id: PostType['id']): Promise<PostResponseType> {
  return axios
    .get(`${process.env.API_URL}/post/${id}`)
}

export function createPost(data: PostType) {
  return axios
    .post(`${process.env.API_URL}/post`, data, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    })
}

export function editPost(data: Partial<PostType>) {
  return axios.post(`${process.env.API_URL}/post/edit`, data, {
    headers: {
      token: localStorage.getItem('token') || '',
    },
  });
}

export function deletePost(id: PostType['id']) {
  return axios
    .post(
      `${process.env.API_URL}/post/delete`,
      { id },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      },
    )
    .then((response) => response.data);
}
