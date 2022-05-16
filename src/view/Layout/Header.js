import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import UserModal from './UserModal';

const HeaderElement = styled.header`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  padding: 10px 0;
  position: relative;
`;

const H1 = styled.h1`
  font-size: 1.7em;
  margin: 0;
  margin-left: 15px;
`;

const Nav = styled.nav`
  font-size: 1.4em;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const HeaderIcons = styled(FontAwesomeIcon)`
  color: black;
  padding: 0 15px;
`;

const CreatePostModalBtn = styled.button`
  border: none;
  background: none;
  font-size: 1.2em;
  padding: 0;
  cursor: pointer;
`;

const UserModalBtn = styled.button`
  border: none;
  background: none;
  font-size: 1.2em;
  padding: 0;
  cursor: pointer;
`;

const Header = ({showUserModal, openUserModal, openCreatePostModal}) => {
return (
  <HeaderElement>
    <H1>Instagram</H1>
    <Nav>
      <Link to="/"><HeaderIcons icon={faHome}></HeaderIcons></Link>
      <CreatePostModalBtn onClick={openCreatePostModal}><HeaderIcons icon={faSquarePlus}></HeaderIcons></CreatePostModalBtn>
      <UserModalBtn onClick={openUserModal}><HeaderIcons icon={faCircleUser}></HeaderIcons></UserModalBtn>
      {showUserModal?<UserModal/>
      :null}
    </Nav>
  </HeaderElement>
)
};

export default Header;