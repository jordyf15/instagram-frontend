import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CreatePostModal from '../CreatePostModal';
import styled from 'styled-components';

const LayoutComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const Layout = ({children}) => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const openCreatePostModal = (e) => {
    e.stopPropagation();
    setShowCreatePostModal(true);
  }

  const closeCreatePostModal = () => {
    setShowCreatePostModal(false);
  }
  
  const openUserModal = (e) => {
    e.stopPropagation();
    setShowUserModal(true);
  }

  const closeUserModal = () => {
    setShowUserModal(false);
  }

  return (
    <LayoutComponent onClick={closeUserModal}>
      <Header showUserModal={showUserModal} openUserModal={openUserModal} openCreatePostModal={openCreatePostModal}/>
      {showCreatePostModal?<CreatePostModal closeCreatePostModal={closeCreatePostModal}/>:null}
        {children}
      <Footer/>
    </LayoutComponent>
  )
};

export default Layout;
