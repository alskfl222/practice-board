import React, { useCallback, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserType } from '../@types';
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
      <NavigationBar>????????????</NavigationBar>
      <FormContainer name='signup-form' onSubmit={onSubmit}>
        <InputContainer>
          ??????
          <FormInput
            name='name'
            value={data.name}
            onChange={onChange('name')}
          />
        </InputContainer>
        <MessageContainer>
          {isValidName() || data.name.length === 0 ? (
            <p></p>
          ) : (
            <p>????????? 3?????? ?????? 10?????? ???????????? ?????????</p>
          )}
        </MessageContainer>
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
            <p>???????????? ?????? ??????????????????</p>
          )}
        </MessageContainer>
        <InputContainer>
          ????????????
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
              ??????????????? ?????? 8??????, ?????? 15??????????????? <br />
              ?????? ??? ??????????????? 1??? ?????? ????????????????????????
            </p>
          )}
        </MessageContainer>
        <InputContainer>
          ???????????? ??????
          <FormInput
            name='password-confirm'
            value={data.passwordConfirm}
            type='password'
            onChange={onChange('passwordConfirm')}
          />
        </InputContainer>
        <MessageContainer>
          {isValidPasswordConfirm() || data.passwordConfirm === '' ? null : (
            <p>?????? ????????? ??????????????? ???????????? ????????????</p>
          )}
        </MessageContainer>
        <InputContainer>
          ????????????
          <FormInput
            name='pn'
            value={data.pn}
            placeholder='????????? ????????? ?????????'
            onChange={onChange('pn')}
          />
        </InputContainer>
        <MessageContainer>
          {isValidPN() || data.pn.length === 0 ? null : (
            <p>???????????? ?????? ?????????????????????</p>
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
          ????????????
        </SendButton>
        <a href='/signin'>????????? ?????????</a>
      </FormContainer>
    </PageContainer>
  );
}

export default memo(SignUp);
