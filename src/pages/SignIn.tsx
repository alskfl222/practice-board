import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '../states/atom';
import { UserType } from '../@types';
import { signin } from '../apis';
import InputTextLine from '../components/InputTextLine';
import SendButton from '../components/SendButton';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Container = styled.div`
  padding: 1rem;
`;
const PageTitle = styled.div``;
const FormContainer = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const InputContainer = styled.label`
  display: flex;
  gap: 1rem;
`;

function Login() {
  const [formData, setFormData] = useState<Partial<UserType<string>>>({
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const [login, setLogin] = useRecoilState(loginState);
  const handleChange =
    (key: string) =>
    (e: React.FormEvent<HTMLInputElement>): void => {
      setFormData((data: any) => {
        const newData = { ...data };
        newData[key] = (e.target as HTMLInputElement).value;
        return newData;
      });
    };
  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    signin(formData)
      .then((res) => {
        localStorage.setItem('token', res.data!.token);
        setLogin((state) =>
          JSON.stringify({ isLogin: true, email: formData.email })
        );
        setTimeout(() => navigate('/posts'), 2000)
      })
      .catch((err) => console.error(err));
  };
  return (
    <Container>
      <PageTitle>Login PAGE</PageTitle>
      <FormContainer name='login-form' onSubmit={onSubmit}>
        <InputContainer>
          email
          <InputTextLine name='email' onChange={handleChange('email')} />
        </InputContainer>
        <InputContainer>
          password
          <InputTextLine
            name='password'
            type='password'
            onChange={handleChange('password')}
          />
        </InputContainer>
        <SendButton>Login</SendButton>
      </FormContainer>
    </Container>
  );
}

export default Login;
