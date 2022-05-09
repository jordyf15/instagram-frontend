import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import userImage from '../../assets/profile-test.jpg';
import { useSelector } from 'react-redux';

const Container = styled.li`
  position: relative;
  max-width: 300px;
`;

const PostImg = styled.img`
  width: 100%;
`;

const ViewPostBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  border:none;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.4);
  @media (min-width: 600px) {
    flex-direction: row;
  }
  &:hover {
    opacity: 1;
  }
`;

const LikeCount = styled.span`
  color: white;
  font-size: 1.3em;
  margin-bottom: 10px;
  @media (min-width: 600px) {
    margin-right: 30px;
    margin-bottom: 0;
    font-size: 1.5em;
  }
`;

const CommentCount = styled.span`
  color: white;
  font-size: 1.3em;
  @media (min-width: 600px) {
    font-size: 1.5em;
  }
`;

const PostItem = ({postId}) => {
  const post = useSelector((state) => state.post.filter((post)=>post.id === postId)[0]);

  return (
    <Container>
      <PostImg src={userImage} alt=''/>
      <ViewPostBtn>
        <LikeCount><FontAwesomeIcon icon={faHeart}/> {post.like_count}</LikeCount>
        <CommentCount><FontAwesomeIcon icon={faComment}/> {post.comment_count}</CommentCount>
      </ViewPostBtn>
    </Container>
  )
};

export default PostItem;
