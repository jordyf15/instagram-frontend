import React, { useState, useEffect } from 'react';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate])

  const handleChangeEmail = (newEmail) =>{
    setEmail(newEmail);
  }

  const handleChangeFullname = (newFullname) => {
    setFullname(newFullname);
  }

  const handleChangeUsername = (newUsername) => {
    setUsername(newUsername);
  }

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  }

  const handleValidation = () => {
    let newEmailError = '';
    let newPasswordError = '';
    let newUsernameError = '';
    let newFullnameError = '';
    // username
    if(username === ''){
      newUsernameError = 'Username must not be empty';
    }else if(username.length <3 || username.length>30) {
      newUsernameError = 'Username must be between 3 and 30 characters';
    }
    // email
    if(email === '') {
      newEmailError = 'Email must not be empty';
    }
    // password
    if(password === '') {
      newPasswordError = 'Password must not be empty';
    }
    // fullname
    if(fullname === '') {
      newFullnameError = 'Fullname must not be empty'
    } else if(fullname.length<1 || fullname.length>30) {
      newFullnameError = 'Fullname must be between 1 and 30 characters';
    }
    setFullnameError(newFullnameError);
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    setUsernameError(newUsernameError);
    return !newEmailError && !newFullnameError && !newUsernameError && !newPasswordError;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(register({username: username, email: email, fullname: fullname, password: password}))
        .unwrap()
        .then(() => {
          navigate('/login');
        })
        .catch((err) => {
          setUsernameError(err.username);
        });
    }
  }
  
  return (
    <main>
      <div id='upper-container'>
        <h1>Instagram</h1>
        <p id='register-info'>Sign up to see photos and videos from your friends.</p>
        <form onSubmit={handleSubmit}>
          <TextInput error={emailError} label={"Email"} value={email} handleChange={handleChangeEmail} placeholder="Email"/>
          <TextInput error={fullnameError} label={"Fullname"} value={fullname} handleChange={handleChangeFullname} placeholder="Fullname"/>
          <TextInput error={usernameError} label={"Username"} value={username} handleChange={handleChangeUsername} placeholder="Username"/>
          <PasswordInput error={passwordError} label={"Password"} value={password} handleChange={handleChangePassword} placeholder="Password"/>
          <button id='signup-btn' type='submit'>Sign up</button>
        </form>
        <p id='register-terms'>By signing up, you agree to our <strong>Terms</strong>, <strong>Data Policy</strong> and <strong>Cookies Policy</strong>.</p>
      </div>
      <div id='lower-container'>
        <p>Have an Account? <Link className='router-link' to="/login"><span id='login-link'>Log In</span></Link></p>
      </div>
    </main>
  )
};

export default RegisterPage;

