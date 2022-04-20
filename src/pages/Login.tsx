import React, { useState } from 'react';
import axios from 'axios';

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

function Login() {
  const [formData, setFormData] = useState<any>({});
  return (
    <Container>
      <PageTitle>Login PAGE</PageTitle>
      <FormContainer
        name='login-form'
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          console.log('CLICK');
          const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
          }
          console.log(target.email.value)
        }}
      >
        <div>
          email
          <InputTextLine name='email'/>
        </div>
        <div>
          password
          <InputTextLine />
        </div>
        <SendButton>LOGIN</SendButton>
      </FormContainer>
    </Container>
  );
}

export default Login;
