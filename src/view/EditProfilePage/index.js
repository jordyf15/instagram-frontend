import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Layout from '../Layout';
import ChangeProfilePicModal from './ChangeProfilePicModal';
import ImageInput from './ImageInput';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';
import { updateProfile } from '../../redux/slices/userSlice';
import { requestImageUrl } from '../../utils/imageRequest';

const Main = styled.main`
  background-color: white;
  flex-grow: 1;
  padding: 15px;
  @media (min-width: 450px) {
    margin-top: 60px;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
  }
  @media (min-width: 750px) {
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    width: 100%;
    max-width: 950px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #dbdbdb;
  }
`;

const ProfilePic = styled.img`
  width: 40px;
  border-radius: 50%;
  border: 1px solid #e6e6e6;
  margin-right: 25px;
`;

const ProfilePicContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  @media (min-width: 750px) {
    min-width: 450px;
  }
`;

const ChangeProfilePicContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
`;

const Username = styled.h2`
  font-weight: normal;
  font-size: 1.2em;
  margin: 0;
`;

const ChangeProfilePicBtn = styled.button`
  font-family: 'Roboto';
  font-weight: bold;
  border: none;
  background: none;
  padding: 0;
  color: #0095f6;
`;

const Info = styled.p`
  font-size: 0.75em;
  color: #8e8e8e;
  padding-right: 10px;
`;

const FullnameContainer = styled.div`
  margin-bottom: 15px;
  max-width: 450px;
  @media (min-width: 750px) {
    min-width: 450px;
  }
`;

const UsernameContainer = styled.div`
  max-width: 450px;
  @media (min-width: 750px) {
    min-width: 450px;
  }
`;

const LearnMoreLink = styled.span`
  color: #0095f6;
`;

const EmailContainer = styled.div`
  margin: 30px 0 20px;
  max-width: 450px;
  @media (min-width: 750px) {
    min-width: 450px;
  }
`;

const ConfirmEmailBtn = styled.button`
  background-color: #0095f6;
  color: white;
  border:none;
  margin-top: 10px;
  padding: 8px 10px;
  font-weight: bold;
  border-radius: 5px;
  font-family: 'Roboto';
`;

const PasswordContainer = styled.div`
  max-width: 450px;
  margin-bottom: 10px;
  @media (min-width: 750px) {
    min-width: 450px;
  }
`;

const SubmitBtn = styled.button`
  color: white;
  border:none;
  padding: 8px 10px;
  font-weight: bold;
  border-radius: 5px;
  font-family: 'Roboto';
`;

const ActiveSubmitBtn = styled(SubmitBtn)`
  background-color: #0095f6;
`;

const DisabledSubmitBtn = styled(SubmitBtn)`
  background-color: rgba(0,149,246,0.3);  
`;

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const [fullname, setFullname] = useState(user.fullname ?? '');
  const [username, setUsername] = useState(user.username ?? '');
  const [email, setEmail] = useState(user.email ?? '');
  const [password, setPassword] = useState('');
  const [profilePictures, setProfilePictures] = useState(user.profile_pictures);
  const [validSubmit, setValidSubmit] = useState(false);
  const [showChangeProfilePicModal, setShowChangeProfilePicModal] = useState(false);

  useEffect(() => {
    setUsername(user.username ?? '');
    setFullname(user.fullname ?? '');
    setEmail(user.email ?? '');
    setProfilePictures(user.profile_pictures);
    setPassword('');
  }, [user]);

  const closeChangeProfilePicModal = () => {
    setShowChangeProfilePicModal(false);
  };

  const openChangeProfilePicModal = () => {
    setShowChangeProfilePicModal(true);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(updateProfile({username, fullname, email, password, userId: user.id}))
    setValidSubmit(false);
  };

  const handleChangeProfilePicture = async(profilePic) => {
    await dispatch(updateProfile({username: user.username, fullname: user.fullname, email: user.email, password: null,profilePic, userId: user.id}))
    setProfilePictures(null);
    setShowChangeProfilePicModal(false);
  };

  const handleChangeUsername = (newUsername) => {
    setValidSubmit(true);
    setUsername(newUsername);
  };

  const handleChangeFullname = (newFullname) => {
    setValidSubmit(true);
    setFullname(newFullname);
  };

  const handleChangeEmail = (newEmail) => {
    setValidSubmit(true);
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setValidSubmit(true);
    setPassword(newPassword);
  };
  return (
    <Layout>
      <Main>
        {
          showChangeProfilePicModal
          ?<ChangeProfilePicModal closeModal={closeChangeProfilePicModal} handleChange={handleChangeProfilePicture}/>
          :null
        }        
        <ProfilePicContainer>
          {
            user.profile_pictures
            ?<ProfilePic key={user.profile_pictures[0].url} src={requestImageUrl(user.profile_pictures[0].url)} alt=''/>
            :<ProfilePic key='./profile_pictures/small-default-profile.jpg' src={requestImageUrl('./profile_pictures/small-default-profile.jpg')} alt=''/>
          }
          
          <ChangeProfilePicContainer>
            <Username>{user.username}</Username>
            {user.profile_pictures
            ?<ChangeProfilePicBtn onClick={openChangeProfilePicModal}>Change Profile Photo</ChangeProfilePicBtn>
            :<ImageInput handleChange={handleChangeProfilePicture} profilePictures={profilePictures}/>}
          </ChangeProfilePicContainer>
        </ProfilePicContainer>
        <form onSubmit={handleSubmit}>
          <FullnameContainer>
            <TextInput value={fullname} handleChange={handleChangeFullname} label='Name'/>
            <Info>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</Info>
            <Info>You can only change your name twice within 14 days.</Info>
          </FullnameContainer>
          <UsernameContainer>
            <TextInput value={username} handleChange={handleChangeUsername} label='Username'/>
            <Info>In most cases, you'll be able to change your username back to {user.username} for another 14 days. <LearnMoreLink>Learn More</LearnMoreLink></Info>
          </UsernameContainer>
          <EmailContainer>
            <TextInput value={email} handleChange={handleChangeEmail} label='Email'/>
            <ConfirmEmailBtn>Confirm Email</ConfirmEmailBtn>
          </EmailContainer>
          <PasswordContainer>
            <PasswordInput value={password} handleChange={handleChangePassword} label='New Password'/>
          </PasswordContainer>
          {validSubmit
          ?<ActiveSubmitBtn type='submit'>Submit</ActiveSubmitBtn>
          :<DisabledSubmitBtn type='submit' disabled>Submit</DisabledSubmitBtn>}
        </form>
      </Main>
    </Layout>
  )
};

export default EditProfilePage;
