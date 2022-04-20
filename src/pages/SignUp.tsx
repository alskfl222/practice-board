import React, { useState } from 'react';
import axios from 'axios';

import InputTextLine from '../components/InputTextLine';
import SendButton from '../components/SendButton';

import styled from 'styled-components';
import { theme } from '../styles/theme';

import { UserType } from '../@types';

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

function SignUp() {
  const [formData, setFormData] = useState<UserType>({
    name: '',
    email: '',
    password: '',
    pn: '',
  });
  const isVaild = (key: string): boolean => {
    const { name, email, password, pn } = formData;
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
        const passwordRegex =
        /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,15}$/;
        const passwordCondition = passwordRegex.test(password);
        if (passwordCondition) return true;
        return false;
      case 'pn':
        return false;
      default:
        return false;
    }
  };
  const handleChange =
    (key: string) =>
    (e: React.FormEvent<HTMLInputElement>): void => {
      setFormData((data: any) => {
        const newData = { ...data };
        newData[key] = (e.target as HTMLInputElement).value;
        return newData;
      });
      console.log(formData);
    };
  console.log(isVaild('email'));
  return (
    <Container>
      <PageTitle>SignUp PAGE</PageTitle>
      <FormContainer
        name='signup-form'
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          console.log('CLICK');
        }}
      >
        <label>
          name
          <InputTextLine name='name' onChange={handleChange('name')} />
          {isVaild('name')
            ? '유효한 이름입니다'
            : formData.name.length === 0
            ? null
            : '이름은 3글자 이상이어야 합니다'}
        </label>
        <label>
          email
          <InputTextLine name='email' onChange={handleChange('email')} />
          {isVaild('email')
            ? '유효한 이메일입니다'
            : formData.email.length === 0
            ? null
            : '유효하지 않은 이메일입니다'}
        </label>
        <label>
          password
          <InputTextLine name='password' onChange={handleChange('password')} />
          {isVaild('password') ? (
            '유효한 비밀번호입니다'
          ) : formData.password.length === 0 ? null : (
            <p>
              비밀번호는 최소 8글자, 최대 15글자이면서 <br />
              숫자 및 특수문자를 1개 이상 포함하여야합니다
            </p>
          )}
        </label>
        <label>
          phone
          <InputTextLine placeholder='선택 사항'/>
        </label>
        <SendButton>SignUp</SendButton>
      </FormContainer>
    </Container>
  );
}

export default SignUp;
