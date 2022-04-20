import axios from 'axios';
import { UserType, LoginResponseType } from '../@types';

export function signin(data: Partial<UserType<string>>): Promise<LoginResponseType> {
  return axios
    .post(`${process.env.API_URL}/user`, data)
    .then((response) => response.data);
}

export function register(data: UserType<string>): Promise<any> {
  return axios
    .post(`${process.env.API_URL}/user/register`, data)
    .then((response) => response.data);
}
