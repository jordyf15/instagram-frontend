import React, { useEffect, useState } from 'react';
import { login } from '../../redux/slices/authenticationSlice';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.main`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Container = styled.div`
  text-align: center;
  max-width:270px;
  @media (min-width: 450px) {
    background-color: white;
    border: 1px solid #dbdbdb;
    padding: 10px 40px;
    max-width: 270px;
    width: 100%;
    box-sizing: content-box;
    text-align: center;
  }
`;

const LoginBtn = styled.button`
  background-color: #0095f6;
  color: white;
  font-weight: bold;
  border:none;
  font-size: 0.9em;
  width: 100%;
  padding: 7px 0;
  border-radius:5px;
`;

const LoginBtnDisabled = styled.button`
  background-color: #afdcf9;
  color: white;
  font-weight: bold;
  border:none;
  font-size: 0.9em;
  width: 100%;
  padding: 7px 0;
  border-radius:5px;
`;

const Title = styled.h1`
  margin: 25px 0 0;
`;

const LoginError = styled.p`
  color: #ee2d3e;
  font-size: 0.95em;
  margin-bottom: 20px;
`;

const RegisterOffer = styled.p`
  font-size: 0.9em;
  color: #8e8e8e;
  padding: 0 20px;
`;

const RegisterLink = styled.span`
  color: #0095f6;
`;

const LoginForm = styled.form`
  margin-top: 35px;
`;

const RouterLink = styled(Link)`
  text-decoration: none;
`;
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [validSubmit, setValidSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    setValidSubmit(username !== '' && password !== '');
  }, [username, password]);

  useEffect(() => {
    if(isLoggedIn) navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validSubmit) {
      dispatch(login({username, password}))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          setLoginError(err);
        })
    }
  };

  const handleChangeUsername = (newUsername) => {
    setUsername(newUsername);
  }

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  }

  return (
    <Main>
      <Container>
      <Title>Instagram</Title>
        <LoginForm onSubmit={handleSubmit}>
          <TextInput placeholder="Username" value={username} handleChange={handleChangeUsername} error='' label="Username"/>
          <PasswordInput placeholder="Password" value={password} handleChange={handleChangePassword} error='' label="Password"/>
          {
            validSubmit?<LoginBtn type='submit'>Log In</LoginBtn>
            :<LoginBtnDisabled type='submit' disabled>Log In</LoginBtnDisabled>
          }
        </LoginForm>
        <LoginError>{loginError}</LoginError>
        <RegisterOffer>Don't have an account? <RouterLink to='/register'><RegisterLink id='register-link'>Sign up</RegisterLink></RouterLink></RegisterOffer>
      </Container>
    </Main>
  )
};

export default LoginPage;