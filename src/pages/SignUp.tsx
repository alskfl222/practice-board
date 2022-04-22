import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import InputTextLine from '../components/InputTextLine';
import SendButton from '../components/SendButton';

import { theme } from '../styles/theme';

import { UserType } from '../@types';
import { register } from '../apis';
import NavigationBar from '../components/NavigationBar';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const FormContainer = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  a {
    text-decoration: underline;
  }
`;
const InputContainer = styled.label`
  width: 50%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
const MessageContainer = styled.div`
  font-size: 0.8rem;
`;
const HorizonDivider = styled.div`
  width: 80%;
  margin: 2rem 0;
  box-shadow: 0 0.5px 0 0.5px black;
`;

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserType>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    pn: '',
  });
  const isVaild = (key: string): boolean => {
    const { name, email, password, passwordConfirm, pn } = formData;
    switch (key) {
      case 'name':
        const nameCondition = name.length > 2;
        if (nameCondition) return true;
        return false;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailCondition = emailRegex.test(email);
        if (emailCondition) return true;
        return false;
      case 'password':
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,15}$/;
        const passwordCondition = passwordRegex.test(password);
        if (passwordCondition) return true;
        return false;
      case 'password-confirm':
        const compare = formData.password;
        const passwordConfirmCondition =
          passwordConfirm &&
          passwordConfirm.length > 0 &&
          compare === passwordConfirm;
        if (passwordConfirmCondition) return true;
        return false;
      case 'pn':
        const pnRegex = /^0(2([0-9]{7,8})|[1|3-9]([0-9]{8,9}))$/;
        const pnCondition = pnRegex.test(pn);
        if (pnCondition) return true;
        return false;
      default:
        return false;
    }
  };
  const onChange =
    (key: keyof UserType) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData((data: UserType) => {
        return { ...data, [key]: e.target.value };
      });
    };
  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    register(formData)
      .then((response) => {
        console.log(response);
        navigate('/signin');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <NavigationBar>회원가입</NavigationBar>
      <FormContainer name='signup-form' onSubmit={onSubmit}>
        <InputContainer>
          이름
          <InputTextLine
            name='name'
            value={formData.name}
            onChange={onChange('name')}
          />
        </InputContainer>
        <MessageContainer>
          {isVaild('name') ? (
            <p>유효한 이름입니다</p>
          ) : formData.name.length === 0 ? <p></p> : (
            <p>이름은 3글자 이상이어야 합니다</p>
          )}
        </MessageContainer>
        <InputContainer>
          E-mail
          <InputTextLine
            name='email'
            value={formData.email}
            onChange={onChange('email')}
          />
        </InputContainer>
        <MessageContainer>
          {isVaild('email') ? (
            <p>유효한 이메일입니다</p>
          ) : formData.email.length === 0 ? null : (
            <p>유효하지 않은 이메일입니다</p>
          )}
        </MessageContainer>
        <InputContainer>
          비밀번호
          <InputTextLine
            name='password'
            value={formData.password}
            type='password'
            onChange={onChange('password')}
          />
        </InputContainer>
        <MessageContainer>
          {isVaild('password') ? (
            <p>유효한 비밀번호입니다</p>
          ) : formData.password.length === 0 ? null : (
            <p>
              비밀번호는 최소 8글자, 최대 15글자이면서 <br />
              숫자 및 특수문자를 1개 이상 포함하여야합니다
            </p>
          )}
        </MessageContainer>
        <InputContainer>
          비밀번호 확인
          <InputTextLine
            name='password-confirm'
            value={formData.password}
            type='password-confirm'
            onChange={onChange('password')}
          />
        </InputContainer>
        <MessageContainer>
          {isVaild('password-confirm') ? (
            <p>위에 입력한 비밀번호와 일치합니다</p>
          ) : formData.password.length === 0 ? null : (
            <p>위에 입력한 비밀번호와 일치하지 않습니다</p>
          )}
        </MessageContainer>
        <InputContainer>
          전화번호
          <InputTextLine
            name='pn'
            placeholder='숫자만 입력해 주세요'
            onChange={onChange('pn')}
          />
        </InputContainer>
        <MessageContainer>
          {formData.pn.length === 0 ? null : isVaild('pn') ? (
            <p> 유효한 전화번호입니다</p>
          ) : (
            <p>유효하지 않은 전화번호입니다</p>
          )}
        </MessageContainer>
        <HorizonDivider />
        <SendButton
          disabled={
            !(isVaild('name') && isVaild('email') && isVaild('password'))
          }
        >
          회원가입
        </SendButton>
        <div>
          <a onClick={() => navigate('/signin')}>로그인 페이지</a>
        </div>
      </FormContainer>
    </Container>
  );
}

export default SignUp;
