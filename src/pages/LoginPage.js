import React, { useEffect, useState } from 'react';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';
import { login } from '../redux/slices/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate])
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateInput()) {
      dispatch(login({username, password}))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          setUsernameError(err.username);
          setPasswordError(err.password);
        })
    }
  };

  const validateInput = () => {
    let newUsernameError = '';
    let newPasswordError = '';
    if(username === '') {
      newUsernameError = 'Username must not be  empty';
    }
    if(password === '' ){
      newPasswordError = 'Password must not be empty';
    }
    setUsernameError(newUsernameError);
    setPasswordError(newPasswordError);
    return !newUsernameError && !newPasswordError;
  }

  const handleChangeUsername = (newUsername) => {
    setUsername(newUsername);
  }

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  }

  return (
    <main>
      <h1>Instagram</h1>
      <form onSubmit={handleSubmit}>
        <TextInput placeholder="Username" value={username} handleChange={handleChangeUsername} error={usernameError} label="Username"/>
        <PasswordInput placeholder="Password" value={password} handleChange={handleChangePassword} error={passwordError} label="Password"/>
        <button type="submit">Log In</button>
      </form>
    </main>
  )
};

export default LoginPage;