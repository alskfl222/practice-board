import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { loginState } from '../states/atom';
import { UserType } from '../@types';
import { signin } from '../apis';
import InputTextLine from '../components/InputTextLine';
import SendButton from '../components/SendButton';
import { theme } from '../styles/theme';
import NavigationBar from '../components/NavigationBar';

const Container = styled.div`
  padding: 1rem;
`;
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

function Signin() {
  const [formData, setFormData] = useState<Partial<UserType>>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(loginState);
  const handleChange =
    (key: keyof UserType) =>
    (e: React.FormEvent<HTMLInputElement>): void => {
      setFormData((data: Partial<UserType>) => {
        const newData = { ...data };
        newData[key] = (e.target as HTMLInputElement).value;
        return newData;
      });
    };
  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    signin(formData)
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('token', response.data!.token);
        setLogin((state) => JSON.stringify({ isLogin: true }));
        setTimeout(() => navigate('/post'), 2000);
      })
      .catch((err) => console.error(err));
  };
  return (
    <Container>
      <NavigationBar>SignIn Page</NavigationBar>
      <div>
        <a onClick={() => navigate('/signup')}>Go to SignUp Page</a>
      </div>
      <FormContainer name='signin-form' onSubmit={onSubmit}>
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

export default Signin;
