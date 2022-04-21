import axios from 'axios';
import {
  UserType,
  PostQueryType,
  SigninResponseType,
  PostResponseType,
  SignupResponseType,
} from '../@types';

axios.defaults.headers.post['token'] = localStorage.getItem('token') || ''

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

export function createPost(data: any) {
  return axios.post(`${process.env.API_URL}/post`, data)
}
