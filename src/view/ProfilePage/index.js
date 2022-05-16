import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../redux/slices/postSlice';
import PostDetail from '../PostDetail';
import { DEFAULT_PROFILE_PICTURE_LINK, requestImageUrl } from '../../utils/imageRequest';

const Main = styled.main`
  flex-grow: 1;
  @media (min-width: 750px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const UpperContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 25px;
  padding: 15px;
  max-width: 350px;
  @media (min-width: 750px) {
    max-width: 950px;
    width: 95%;
    grid-template-columns: repeat(3, 1fr) repeat(2, 0);
    grid-template-rows: none;
    margin-top: 15px;
  }
`;

const UserProfileImg = styled.img`
  width: 80px;
  border-radius: 50%;
  border: 1px solid #e6e6e6;
  grid-area: 1/1/2/2;
  margin-right: 25px;
  @media (min-width: 750px) {
    width: 150px;
  }
`;

const UserProfileImgContainer = styled.div`
  @media (min-width: 750px) {
    text-align: center; 
    grid-area: 1 / 1 / 6 / 2; 
  }
`;

const MainInfoContainer = styled.div`
  grid-area: 1/2/2/4;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 750px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    grid-area: 1 / 2 / 2 / 4;   
  }
`;

const OtherInfoContainer = styled.div`
  grid-area: 2/1/3/4;
  @media (min-width: 750px) {
    grid-area: 2 / 2 / 3 / 3;
  }
`;

const Fullname = styled.p`
  font-weight: bold;
  font-size: 0.9em;
  margin: 0;
  @media (min-width: 750px) {
    font-size: 1em;
    margin: 5px 0;
  }
`;

const Username = styled.h2`
  font-weight: normal;
  font-size: 1.8em;
  margin: 5px 0 0;
  @media (min-width: 750px) {
    margin-right: 20px;
  }
`;

const Email = styled.p`
  margin: 0;
  font-size: 0.9em;
  @media (min-width: 750px) {
    font-size: 1em;
    margin: 5px 0;
  }
`;

const EditProfileLink = styled(Link)`
  border: 1px solid #dbdbdb;
  background-color: #fafafa;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9em;
  color: black;
  padding: 5px 0px;
  border-radius: 5px;
  text-align: center;
  @media (min-width: 750px){
    padding: 5px 10px;
  }
`;

const LowerContainer = styled.div`
  padding: 0 15px;
  @media (min-width: 750px) {
    max-width: 950px;
    width: 95%;
  }
`;

const LowerContainerHeader = styled.div`
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  text-align: center;
`;

const PostsTab = styled.button`
  font-family: 'Roboto';
  background: none;
  border: none;
  border-top: 1px solid black;
  padding: 15px 10px;
`;

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [selectedPostId, setSelectedPostId] = useState('');
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  const openPostDetail = (postId) => {
    setSelectedPostId(postId);
  };

  const closePostDetail = () => {
    setSelectedPostId('');
  };

  return (
    <Layout>
      <Main>
        {
          selectedPostId
          ?<PostDetail postId={selectedPostId} close={closePostDetail}/>
          :null
        }
        <UpperContainer>
          <UserProfileImgContainer>
            {
              user.profile_pictures
              ?<UserProfileImg src={requestImageUrl(user.profile_pictures[1].url)} alt=''/>
              :<UserProfileImg src={requestImageUrl(DEFAULT_PROFILE_PICTURE_LINK)} alt=''/>
            }
          </UserProfileImgContainer>
          <MainInfoContainer>
            <Username>{user.username}</Username>
            <EditProfileLink to='edit'>Edit Profile</EditProfileLink>
          </MainInfoContainer>
          <OtherInfoContainer>
            <Fullname>{user.fullname}</Fullname>
            <Email>{user.email}</Email>
          </OtherInfoContainer>
        </UpperContainer>
        <LowerContainer>
          <LowerContainerHeader>
            <PostsTab>POSTS</PostsTab>
          </LowerContainerHeader>
          <PostList posts={myPosts} openPostDetail={openPostDetail}/>
        </LowerContainer>
      </Main>
    </Layout>
  )
};

export default ProfilePage;


