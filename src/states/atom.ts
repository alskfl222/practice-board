import { atom } from 'recoil';

export const textState = atom({
  key: 'textState',
  default: '',
});

export const loginState = atom({
  key: 'loginState',
  default: JSON.stringify({ isLogin: false }),
});
