import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostOptionModal from '../../components/PostOptionModal';
import { deletePost, getPosts } from '../../redux/slices/postSlice';
import EditPostModal from '../EditPostModal';
import Layout from '../Layout';
import PostComments from '../PostComments';
import PostItem from './PostItem';

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100vw;
`;

const HomePage = () => {
  const [currentPostDetailId, setCurrentPostDetailId] = useState('');
  const [currentPostOptionId, setCurrentPostOptionId] = useState('');
  const [currentPostEditId, setCurrentPostEditId] = useState('');
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
    setCurrentPostDetailId(postId);
  };

  const closePostComments = () => {
    setCurrentPostDetailId('');
  };

  const openPostOptionModal = (postId) => {
    setCurrentPostOptionId(postId);
  };

  const closePostOptionModal = () => {
    setCurrentPostOptionId('');
  };

  const handleDeletePost = async() => {
    await dispatch(deletePost(currentPostOptionId));
    closePostOptionModal();
  };

  const openEditPostModal = () => {
    setCurrentPostEditId(currentPostOptionId);
  };

  const closeEditPostModal = () => {
    setCurrentPostEditId('');
  };

  return(
    <Layout> 
      {
      currentPostDetailId
      ?<PostComments close={closePostComments} postId={currentPostDetailId}/>
      :null
      }
      {
        currentPostOptionId
        ?<PostOptionModal closeModal={closePostOptionModal} handleDelete={handleDeletePost} openEditModal={openEditPostModal}/>
        :null
      }
      {
        currentPostEditId
        ?<EditPostModal postId={currentPostEditId} closeModal={closeEditPostModal}/>
        :null
      }
      <PostList>
        {posts.map((post)=><PostItem openOptionModal={openPostOptionModal} showPostComments={showPostComments} post={post} key={post.id}/>)}
      </PostList>
    </Layout>
  )
};

export default HomePage;
