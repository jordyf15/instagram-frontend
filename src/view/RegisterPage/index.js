import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';

const Main = styled.main`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const UpperContainer = styled.div`
  margin-top: 70px;
  text-align: center;
  max-width:270px;
  @media (min-width: 450px) {
    background-color: white;
    border: 1px solid #dbdbdb;
    padding: 35px 40px;
    box-sizing: content-box;
  }
`;

const RegisterInfo = styled.p`
  font-weight: bold;
  color: #8e8e8e;
  font-size: 1.1em;
`;

const SignupBtn = styled.button`
  background-color: #0095f6;
  color: white;
  font-weight: bold;
  border:none;
  font-size: 0.9em;
  width: 100%;
  padding: 7px 0;
  border-radius:5px;
`;

const SignUpBtnDisabled = styled.button`
  background-color: #afdcf9;
  color: white;
  font-weight: bold;
  border:none;
  font-size: 0.9em;
  width: 100%;
  padding: 7px 0;
  border-radius:5px;
`;

const RegisterTerms = styled.p`
  color: #8e8e8e;
  font-size: 0.75em;
  margin-top: 20px;
`;

const LowerContainer = styled.div`
  margin-top: 60px;
  font-size: 0.9em;
  color: #8e8e8e;
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

const LoginLink = styled.span`
  color: #0095f6;
`;

const Title = styled.h1`
  margin: 0;
`;

const RegisterError = styled.p`
  color: #ee2d3e;
  font-size: 0.87em;
`;

const RouterLink = styled(Link)`
  text-decoration: none;
`;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [validSubmit, setValidSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn) navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValidSubmit(!usernameError && !fullnameError && !emailError && !passwordError && 
      username !== '' && password !== '' && email !== '' && fullname !== '');
  }, [usernameError, fullnameError, emailError, passwordError, username, password, email, fullname]);

  const handleChangeEmail = (newEmail) =>{
    let newEmailError = '';
    if(newEmail === '') {
      newEmailError = 'Email must not be empty';
    }
    setEmailError(newEmailError);
    setEmail(newEmail);
  }

  const handleChangeFullname = (newFullname) => {
    let newFullnameError = '';
    if(newFullname === '') {
      newFullnameError = 'Fullname must not be empty'
    } else if(newFullname.length<1 || newFullname.length>30) {
      newFullnameError = 'Fullname must be between 1 and 30 characters';
    }
    setFullnameError(newFullnameError);
    setFullname(newFullname);
  }

  const handleChangeUsername = (newUsername) => {
    let newUsernameError = '';
    if(newUsername === '') {
      newUsernameError = 'Username must not be empty';
    } else if(newUsername.length <3 || newUsername.length>30) {
      newUsernameError = 'Username must be between 3 and 30 characters';
    }
    setUsernameError(newUsernameError);
    setUsername(newUsername);
  }

  const handleChangePassword = (newPassword) => {
    let newPasswordError = '';
    if(newPassword === '') {
      newPasswordError = 'Password must not be empty';
    }
    setPasswordError(newPasswordError);
    setPassword(newPassword);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validSubmit) {
      dispatch(register({username, email, fullname, password}))
        .unwrap()
        .then(() => {
          setRegisterError('');
          navigate('/login');
        })
        .catch((err) => {
          setRegisterError(err);
        });
    }
  }
  
  return (
    <Main>
      <UpperContainer>
        <Title>Instagram</Title>
        <RegisterInfo>Sign up to see photos and videos from your friends.</RegisterInfo>
        <form onSubmit={handleSubmit}>
          <TextInput error={emailError} label={"Email"} value={email} handleChange={handleChangeEmail}/>
          <TextInput error={fullnameError} label={"Full Name"} value={fullname} handleChange={handleChangeFullname}/>
          <TextInput error={usernameError} label={"Username"} value={username} handleChange={handleChangeUsername} />
          <PasswordInput error={passwordError} label={"Password"} value={password} handleChange={handleChangePassword}/>
          {
            validSubmit?<SignupBtn type='submit'>Sign up</SignupBtn>
            :<SignUpBtnDisabled type='submit' disabled>Sign up</SignUpBtnDisabled>
          }
        </form>
        <RegisterError>{registerError}</RegisterError>
        <RegisterTerms>By signing up, you agree to our <strong>Terms</strong>, <strong>Data Policy</strong> and <strong>Cookies Policy</strong>.</RegisterTerms>
      </UpperContainer>
      <LowerContainer>
        <p>Have an Account? <RouterLink to="/login"><LoginLink id='login-link'>Log In</LoginLink></RouterLink></p>
      </LowerContainer>
    </Main>
  )
};

export default RegisterPage;

