import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputTextLine from '../components/InputTextLine';
import SendButton from '../components/SendButton';
import { UserType } from '../@types';
import NavigationBar from '../components/NavigationBar';
import {
  PageContainer,
  FormContainer,
  InputContainer,
  MessageContainer,
  HorizonDivider,
} from '../styles';

function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState<UserType>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    pn: '',
  });

  const isValidName = (): boolean => {
    const { name } = data;
    const nameCondition = name.trim().length >= 3 && name.trim().length <= 10;
    if (nameCondition) return true;
    return false;
  };
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
  const isValidPasswordConfirm = (): boolean => {
    const { passwordConfirm } = data;
    const compare = data.password;
    const passwordConfirmCondition = passwordConfirm
      && passwordConfirm.length > 0
      && compare === passwordConfirm;
    if (passwordConfirmCondition) return true;
    return false;
  };
  const isValidPN = (): boolean => {
    const { pn } = data;
    const pnRegex = /^0(2([0-9]{7,8})|[1|3-9]([0-9]{8,9}))$/;
    const pnCondition = pnRegex.test(pn);
    if (pnCondition) return true;
    return false;
  };

  const onChange = useCallback(
    (key: keyof UserType) =>
      (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData((beforeData: UserType) => ({
          ...beforeData,
          [key]: e.target.value,
        }));
      },
    [],
  );
  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}/user/register`, data)
      .then((response) => {
        console.log(response);
        navigate('/signin');
      })
      .catch((err) => console.error(err));
  };

  return (
    <PageContainer>
      <NavigationBar>회원가입</NavigationBar>
      <FormContainer name='signup-form' onSubmit={onSubmit}>
        <InputContainer>
          이름
          <InputTextLine
            name='name'
            value={data.name}
            onChange={onChange('name')}
          />
        </InputContainer>
        <MessageContainer>
          {isValidName() || data.name.length === 0 ? (
            <p></p>
          ) : (
            <p>이름은 3글자 이상 10글자 이하여야 합니다</p>
          )}
        </MessageContainer>
        <InputContainer>
          E-mail
          <InputTextLine
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
          <InputTextLine
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
        <InputContainer>
          비밀번호 확인
          <InputTextLine
            name='password-confirm'
            value={data.passwordConfirm}
            type='password'
            onChange={onChange('passwordConfirm')}
          />
        </InputContainer>
        <MessageContainer>
          {isValidPasswordConfirm() || data.passwordConfirm === '' ? null : (
            <p>위에 입력한 비밀번호와 일치하지 않습니다</p>
          )}
        </MessageContainer>
        <InputContainer>
          전화번호
          <InputTextLine
            name='pn'
            value={data.pn}
            placeholder='숫자만 입력해 주세요'
            onChange={onChange('pn')}
          />
        </InputContainer>
        <MessageContainer>
          {isValidPN() || data.pn.length === 0 ? null : (
            <p>유효하지 않은 전화번호입니다</p>
          )}
        </MessageContainer>
        <HorizonDivider />
        <SendButton
          disabled={
            !(
              isValidName()
              && isValidEmail()
              && isValidPassword()
              && isValidPasswordConfirm()
              && isValidPN()
            )
          }
        >
          회원가입
        </SendButton>
        <a onClick={() => navigate('/signin')}>로그인 페이지</a>
      </FormContainer>
    </PageContainer>
  );
}

export default SignUp;
