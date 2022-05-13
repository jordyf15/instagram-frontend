import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../../redux/slices/postSlice';
import Layout from '../Layout';
import PostComments from '../PostComments';
import PostItem from './PostItem';

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100vw;
`;

const HomePage = () => {
  const [currentPostId, setCurrentPostId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);

  useEffect(() => {
    if(!isLoggedIn) navigate('/login')
  }, [isLoggedIn, navigate]);

  const showPostComments = (postId) => {
    setCurrentPostId(postId);
  }

  const closePostComments = () => {
    setCurrentPostId('');
  }

  return(
    <Layout> 
      {currentPostId
      ?<PostComments close={closePostComments} postId={currentPostId}/>
      :null}
   
      <PostList>
        {posts.map((post)=><PostItem showPostComments={showPostComments} post={post} key={post.id}/>)}
      </PostList>
    </Layout>
  )
};

export default HomePage;
