import React, { useState } from 'react';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import ImageInput from '../components/ImageInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/slices/user';

const EditProfilePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [profilePic, setProfilePic] = useState({});
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [profilePicError, setProfilePicError] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({username, password, email, fullname, userId, profilePic}))
      .unwrap()
      .then(() => {
        
      });
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
  const handleChangeEmail = (newEmail) => {
    setEmail(newEmail);
  }
  const handleChangeProfilePic = (newProfilePic) => {
    setProfilePic(newProfilePic);
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <TextInput placeholder="Username" value={username} handleChange={handleChangeUsername} error={usernameError} label="Username"/>
        <TextInput placeholder="Fullname" value={fullname} handleChange={handleChangeFullname} error={fullnameError} label="Fullname"/>
        <TextInput placeholder="Email" value={email} handleChange={handleChangeEmail} error={emailError} label="Email"/>
        <PasswordInput placeholder="Password" value={password} handleChange={handleChangePassword} error={passwordError} label="Password"/>
        <ImageInput handleChange={handleChangeProfilePic} error={profilePicError} label="Profile Picture"/>
        <button type="submit">Update</button>
      </form>
    </Layout>
  )
};

export default EditProfilePage;
