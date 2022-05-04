import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import userImage from '../../assets/profile-test.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import VisualMediaSlider from './VisualMediaSlider';
import PostCommentForm from './PostCommentForm';
import { deletePostLike, likePost } from '../../redux/slices/postSlice';

const getTimeStamp = (timeStampStr) => {
  const timeStamp = new Date(timeStampStr).getTime();
  const now = new Date().getTime();
  const result = now-timeStamp;
  if(result>(86400000*7*4*12)){//years
    return `${Math.floor(result/(86400000*7*4*12))} YEARS AGO`;
  } else if(result>(86400000*7*4)){ // months
    return `${Math.floor(result/(86400000*7))} MONTHS AGO`;
  } else if(result>(86400000*7)){ // weeks
    return `${Math.floor(result/(86400000*7))} WEEKS AGO`;
  } else if(result>86400000){ //days
    return `${Math.floor(result/86400000)} DAYS AGO`;
  } else if(result>3600000){ //hours
    return `${Math.floor(result/3600000)} HOURS AGO`;
  } else if(result>60000){ // minutes
    return `${Math.floor(result/60000)} MINUTES AGO`;
  } else { // seconds
    return `${Math.floor(result/1000)} SECONDS AGO`;
  }
}

const PostItemContainer = styled.li`
  background-color: white;
  margin-bottom: 15px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dbdbdb;
`;

const PostItemHeader = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostItemUserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PostItemUsername = styled.h2`
  font-size: 0.9em;
`;

const PostItemUserProfileImg = styled.img`
  width: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const PostItemOptionsBtn = styled.button`
  border:none;
  background: none;
  font-size: 1.3em;
`;

const PostItemDetailContainer = styled.div`
  padding: 10px;
`;

const PostItemToggleLikeBtn = styled.button`
  background: none;
  border:none;
  font-size: 1.5em;
  margin-right: 8px;
`;

const PostItemCommentBtn = styled.button`
  background: none;
  border:none;
  font-size: 1.5em;
`;

const PostItemLikeCount = styled.p`
  margin: 0;
  margin-left: 5px;
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 0.9em;
  font-weight: bold;
`;

const PostItemDetail = styled.p`
  margin: 0;
  margin-left: 5px;
  font-size: 0.9em;
`;

const PostItemTimestamp = styled.p`
  color: #8e8e8e;
  font-size: 0.65em;
  margin-left: 5px;
  margin-top: 15px;
`;

const PostItem = ({post}) => {
  const dispatch = useDispatch();
  const handleDislikePost = () => {
    dispatch(deletePostLike({postId: post.id, likeId: post.like.id}))
    .unwrap()
    .then();
  };

  const handleLikePost = () => {
    dispatch(likePost(post.id))
    .unwrap()
    .then();
  };

  return(
    <PostItemContainer>
      <PostItemHeader>
        <PostItemUserInfoContainer>
          <PostItemUserProfileImg src={userImage} alt=''/>
          <PostItemUsername>{post.user.username}</PostItemUsername>
        </PostItemUserInfoContainer>
        <PostItemOptionsBtn><FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon></PostItemOptionsBtn>
      </PostItemHeader>
      <VisualMediaSlider visualMediaUrls={post.visual_media_urls}/>
      <PostItemDetailContainer>
        <div>
          {post.like
          ?<PostItemToggleLikeBtn onClick={handleDislikePost}><FontAwesomeIcon icon={fullHeart}></FontAwesomeIcon></PostItemToggleLikeBtn>
          :<PostItemToggleLikeBtn onClick={handleLikePost}><FontAwesomeIcon icon={emptyHeart}></FontAwesomeIcon></PostItemToggleLikeBtn>
          }
          <PostItemCommentBtn><FontAwesomeIcon icon={faComment}></FontAwesomeIcon></PostItemCommentBtn>
        </div>
        <PostItemLikeCount>{post.like_count} likes</PostItemLikeCount>
        <PostItemDetail><strong>{post.user.username}</strong> {post.caption}</PostItemDetail>
        <PostItemTimestamp>{getTimeStamp(post.updated_date)}</PostItemTimestamp>
      </PostItemDetailContainer>
      <PostCommentForm postId={post.id}/>
    </PostItemContainer>
  )
};

export default PostItem;
