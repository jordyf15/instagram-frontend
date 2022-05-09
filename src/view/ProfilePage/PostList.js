import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PostItem from './PostItem';

const MyPostList = styled.ul`
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: auto auto auto;  
  gap: 5px;
  @media (min-width: 600px) {
    gap: 15px;
  }
  @media (min-width: 900px) {
    gap: 25px;
  }
`;

const PostList = () => {
  const myPosts = useSelector((state)=>state.post);
  return(
      <MyPostList>
        {myPosts.map((myPost) => <PostItem key={myPost.id} postId={myPost.id}/>)}
      </MyPostList>
  );
}

export default PostList;