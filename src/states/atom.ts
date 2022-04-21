import { atom } from 'recoil';

export const textState = atom({
  key: 'textState',
  default: '',
});

export const signState = atom({
  key: 'signState',
  default: localStorage.getItem('token')
    ? JSON.stringify({ isLogin: true })
    : JSON.stringify({ isLogin: false }),
});
