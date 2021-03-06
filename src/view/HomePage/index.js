import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostOptionModal from '../../components/PostOptionModal';
import { deletePost, getPosts } from '../../redux/slices/postSlice';
import EditPostModal from '../EditPostModal';
import Layout from '../Layout';
import PostDetail from '../PostDetail';
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
  const posts = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
      ?<PostDetail close={closePostComments} postId={currentPostDetailId}/>
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
