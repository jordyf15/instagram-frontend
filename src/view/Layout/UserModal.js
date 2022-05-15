import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { setUser } from '../../redux/slices/userSlice';
import { setPosts } from '../../redux/slices/postSlice';

const ProfileLink = styled(Link)`
  color: black;
  width: 100%;
  padding: 10px 15px;
  font-size: 0.7em;
  text-decoration: none;
  &:hover{
    background-color: #fafafa;
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: -75px;
  right: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 1px rgba(156,156,156,0.75);
`;

const LogoutBtn = styled.button`
  width: 100%;
  background: none;
  border: none;
  border-top: 2px solid #dbdbdb;
  text-align: left;
  padding: 10px 15px;
  font-size: 0.65em;
  &:hover{
    background-color: #fafafa;
  }
`;

const Triangle = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -13px;
  right: 15px;
  overflow: hidden;
  &:after{
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background:white;
    transform: rotate(45deg);
    top: 7px;
    left: 2px;
    box-shadow: -2px -2px 5px -2px rgba(0,0,0,0.5);
  }
`;

const ProfileText = styled.span`
  font-size: 0.9em;
  margin-left: 10px;
`;

const UserModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleLogout = async() => {
    await dispatch(logout());
    navigate('/login');
    dispatch(setUser(null));
    dispatch(setPosts([]));
  };

  return(
    <Container onClick={handleClick}>
      <Triangle></Triangle>
      <ProfileLink to='/profile'>
        <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>
        <ProfileText>Profile</ProfileText>
      </ProfileLink>
      <LogoutBtn onClick={handleLogout}>Log Out</LogoutBtn>
    </Container>
  )
};

export default UserModal;
