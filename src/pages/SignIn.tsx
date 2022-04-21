import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../@types';
import { useRecoilState } from 'recoil';
import { signState } from '../states/atom';
import { signin } from '../apis';
import NavigationBar from '../components/NavigationBar';
import InputTextLine from '../components/InputTextLine';
import SendButton from '../components/SendButton';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const FormContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const InputContainer = styled.label`
  width: 80%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

function SignIn() {
  const [data, setData] = useState<Partial<UserType>>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(signState);
  const onChange =
    (key: keyof UserType) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setData((data: Partial<UserType>) => {
        return { ...data, [key]: e.target.value };
      });
    };
  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    signin(data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data!.token);
        setLogin((state) => JSON.stringify({ isLogin: true }));
        setTimeout(() => navigate('/post'), 1000);
      })
      .catch((err) => console.error(err));
  };
  return (
    <Container>
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
        <SendButton>Login</SendButton>
        <div>
          <a onClick={() => navigate('/signup')}>Go to SignUp Page</a>
        </div>
      </FormContainer>
    </Container>
  );
}

export default SignIn;
