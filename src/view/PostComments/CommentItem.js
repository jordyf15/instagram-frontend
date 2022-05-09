import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import userImage from '../../assets/profile-test.jpg';
import { useDispatch } from 'react-redux';
import { deleteCommentLike, likeComment } from '../../redux/slices/postSlice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px 0 0;
`;

const UserProfilePic = styled.img`
  width: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const DetailContainer = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const Detail = styled.p`
  font-size: 0.85em; 
  margin-top: 10px;
`;

const Timestamp = styled.span`
  color: #8e8e8e;
  font-size: 0.7em;
  margin-top: 15px;
`;

const OptionBtn = styled.button`
  border: none;
  background: none;
  color: #8e8e8e;
  font-size: 1em;
  margin-left:5px;
`;

const ToggleLikeBtn = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin-top: 5px;
  font-size: 0.8em;
`;

const getTimeStamp = (timeStampStr) => {
  const timeStamp = new Date(timeStampStr).getTime();
  const now = new Date().getTime();
  const result = now-timeStamp;
  if(result>(86400000*7*4*12)){//years
    return `${Math.floor(result/(86400000*7*4*12))}y`;
  } else if(result>(86400000*7*4)){ // months
    return `${Math.floor(result/(86400000*7))}m`;
  } else if(result>(86400000*7)){ // weeks
    return `${Math.floor(result/(86400000*7))}w`;
  } else if(result>86400000){ //days
    return `${Math.floor(result/86400000)}d`;
  } else if(result>3600000){ //hours
    return `${Math.floor(result/3600000)}h`;
  } else if(result>60000){ // minutes
    return `${Math.floor(result/60000)}m`;
  } else { // seconds
    return `${Math.floor(result/1000)}s`;
  }
}

const CommentItem = ({comment}) => {
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likeComment({postId:comment.post_id, commentId:comment.id}))
  };

  const handleDislike = () => {
    dispatch(deleteCommentLike({
      postId: comment.post_id, 
      commentId: comment.id, 
      likeId: comment.like.id
    }));
  };

  return(
    <Container>
      <UserProfilePic src={userImage} alt=''/>
      <DetailContainer>
        <Detail><strong>{comment.user.username}</strong> {comment.comment}</Detail>
        <Timestamp>{getTimeStamp(comment.updated_date)}</Timestamp>
        <OptionBtn><FontAwesomeIcon icon={faEllipsis}/></OptionBtn>
      </DetailContainer>
      {comment.like
      ?<ToggleLikeBtn onClick={handleDislike}><FontAwesomeIcon icon={fullHeart}/></ToggleLikeBtn>
      :<ToggleLikeBtn onClick={handleLike}><FontAwesomeIcon icon={emptyHeart}/></ToggleLikeBtn>}
    </Container>
  )
};

export default CommentItem;