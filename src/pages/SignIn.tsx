import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { UserType } from '../@types';
import signState from '../states/atom';
import NavigationBar from '../components/NavigationBar';
import {
  PageContainer,
  FormInput,
  SendButton,
  FormContainer,
  InputContainer,
  MessageContainer,
  HorizonDivider,
} from '../styles';

function SignIn() {
  const navigate = useNavigate();
  const [data, setData] = useState<Pick<UserType, 'email' | 'password'>>({
    email: '',
    password: '',
  });
  const isValidEmail = (): boolean => {
    const { email } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailCondition = emailRegex.test(email);
    if (emailCondition) return true;
    return false;
  };
  const isValidPassword = (): boolean => {
    const { password } = data;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,15}$/;
    const passwordCondition = passwordRegex.test(password);
    if (passwordCondition) return true;
    return false;
  };
  const setLogin = useSetRecoilState(signState);
  const onChange = useCallback(
    (key: keyof UserType) =>
      (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData((beforeData: Pick<UserType, 'email' | 'password'>) => ({
          ...beforeData,
          [key]: e.target.value,
        }));
      },
    [],
  );
  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}/user`, data)
      .then((response) => {
        if (response.data) {
          localStorage.setItem('token', response.data.token);
          setLogin(JSON.stringify({ isLogin: true }));
          setTimeout(() => navigate('/post'), 1000);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <PageContainer gap='2rem'>
      <NavigationBar>로그인</NavigationBar>
      <FormContainer name='signin-form' onSubmit={onSubmit}>
        <InputContainer>
          E-mail
          <FormInput
            name='email'
            value={data.email}
            onChange={onChange('email')}
          />
        </InputContainer>
        <MessageContainer>
          {isValidEmail() || data.email.length === 0 ? null : (
            <p>유효하지 않은 이메일입니다</p>
          )}
        </MessageContainer>
        <InputContainer>
          비밀번호
          <FormInput
            name='password'
            value={data.password}
            type='password'
            onChange={onChange('password')}
          />
        </InputContainer>
        <MessageContainer>
          {isValidPassword() || data.password.length === 0 ? null : (
            <p>
              비밀번호는 최소 8글자, 최대 15글자이면서 <br />
              숫자 및 특수문자를 1개 이상 포함하여야합니다
            </p>
          )}
        </MessageContainer>
        <HorizonDivider />
        <SendButton disabled={!(isValidEmail() && isValidPassword())}>
          로그인
        </SendButton>
        <a href='/signup'>회원가입 페이지</a>
      </FormContainer>
    </PageContainer>
  );
}

export default SignIn;
