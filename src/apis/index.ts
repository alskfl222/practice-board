import axios from 'axios';
import {
  UserType,
  SignupResponseType,
  SigninResponseType,
  PostQueryType,
  PostType,
  PostResponseType,
} from '../@types';

export function signin(data: Partial<UserType>): Promise<SigninResponseType> {
  return axios
    .post(`${process.env.API_URL}/user`, data)
    .then((response) => response.data);
}

export function register(data: UserType): Promise<SignupResponseType> {
  return axios
    .post(`${process.env.API_URL}/user/register`, data)
    .then((response) => response.data);
}

export function getPostList(query: PostQueryType): Promise<PostResponseType> {
  const queryString = Object.entries(query)
    .map((item) => `${item[0]}=${item[1]}`)
    .join('&');
  return axios
    .get(`${process.env.API_URL}/post?${queryString}`)
    .then((response) => response.data);
}

export function getPost(id: string): Promise<PostResponseType> {
  return axios
    .get(`${process.env.API_URL}/post/${id}`)
    .then((response) => response.data);
}

export function createPost(data: PostType) {
  const token = localStorage.getItem('token') || '';
  return axios
    .post(`${process.env.API_URL}/post`, data, {
      headers: {
        token,
      },
      withCredentials: true,
    })
    .then((response) => response.data);
}
