import { atom } from 'recoil';

const signState = atom({
  key: 'signState',
  default: localStorage.getItem('token')
    ? JSON.stringify({ isLogin: true })
    : JSON.stringify({ isLogin: false }),
});

export default signState;
