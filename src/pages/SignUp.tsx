import React, { useState } from 'react';

import styled from 'styled-components';
import InputTextLine from '../components/InputTextLine';
import SendButton from '../components/SendButton';

import { theme } from '../styles/theme';

import { UserType } from '../@types';
import { register } from '../apis';

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

function SignUp() {
  const [formData, setFormData] = useState<UserType<string>>({
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
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,15}$/;
      const passwordCondition = passwordRegex.test(password);
      if (passwordCondition) return true;
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
  const handleChange = (key: string) =>
    (e: React.FormEvent<HTMLInputElement>): void => {
      setFormData((data: any) => {
        const newData = { ...data };
        newData[key] = (e.target as HTMLInputElement).value;
        return newData;
      });
    };
  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    register(formData).then().catch();
  };

  return (
    <Container>
      <PageTitle>SignUp PAGE</PageTitle>
      <FormContainer name='signup-form' onSubmit={onSubmit}>
        <InputContainer>
          name
          <InputTextLine name='name' onChange={handleChange('name')} />
          {isVaild('name')
            ? '유효한 이름입니다'
            : formData.name.length === 0
              ? null
              : '이름은 3글자 이상이어야 합니다'}
        </InputContainer>
        <InputContainer>
          email
          <InputTextLine name='email' onChange={handleChange('email')} />
          {isVaild('email')
            ? '유효한 이메일입니다'
            : formData.email.length === 0
              ? null
              : '유효하지 않은 이메일입니다'}
        </InputContainer>
        <InputContainer>
          password
          <InputTextLine name='password' type='password' onChange={handleChange('password')} />
          {isVaild('password') ? (
            '유효한 비밀번호입니다'
          ) : formData.password.length === 0 ? null : (
            <p>
              비밀번호는 최소 8글자, 최대 15글자이면서 <br />
              숫자 및 특수문자를 1개 이상 포함하여야합니다
            </p>
          )}
        </InputContainer>
        <InputContainer>
          phone
          <InputTextLine
            name='pn'
            placeholder='선택 사항, 숫자만 입력해 주세요'
            onChange={handleChange('pn')}
          />
          {formData.pn.length === 0
            ? null
            : isVaild('pn')
              ? '유효한 전화번호입니다'
              : '유효하지 않은 전화번호입니다'}
        </InputContainer>
        <SendButton
          disabled={
            !(isVaild('name') && isVaild('email') && isVaild('password'))
          }
        >
          SignUp
        </SendButton>
      </FormContainer>
    </Container>
  );
}

export default SignUp;
