import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { UserType } from '../@types';
import signState from '../states/atom';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import InputTextLine from '../components/InputTextLine';
import SendButton from '../components/SendButton';
import { PageContainer } from '../styles';

const FormContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const InputContainer = styled.label`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;
const HorizonDivider = styled.div`
  width: 80%;
  margin: 2rem 0;
  box-shadow: 0 0.5px 0 0.5px black;
`;

function SignIn() {
  const navigate = useNavigate();
  const [data, setData] = useState<Partial<UserType>>({
    email: '',
    password: '',
  });
  const setLogin = useSetRecoilState(signState);
  const onChange = useCallback(
    (key: keyof UserType) =>
      (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData((beforeData: Partial<UserType>) => ({
          ...beforeData,
          [key]: e.target.value,
        }));
      },
    []
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
          <InputTextLine
            name='email'
            value={data.email}
            onChange={onChange('email')}
          />
        </InputContainer>
        <InputContainer>
          비밀번호
          <InputTextLine
            name='password'
            value={data.password}
            type='password'
            onChange={onChange('password')}
          />
        </InputContainer>
        <HorizonDivider />
        <SendButton>로그인</SendButton>
        <a onClick={() => navigate('/signup')}>회원가입 페이지</a>
      </FormContainer>
    </PageContainer>
  );
}

export default SignIn;
