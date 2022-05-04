import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getPosts } from '../../redux/slices/postSlice';
import Layout from '../Layout';
import PostItem from './PostItem';

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100vw;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts())
    .unwrap()
    .then();
  }, [dispatch])

  return(
    <Layout>
      <PostList>
        {posts.map((post)=><PostItem post={post} key={post.id}/>)}
      </PostList>
    </Layout>
  )
};

export default HomePage;
