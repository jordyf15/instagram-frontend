import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import userImage from '../../assets/profile-test.jpg';

const CommentListContainer = styled.div`
  flex-grow:1;
  margin: 0;
  overflow: auto;
`;

const PostContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px 15px 0;
  margin-top: 5px;
`;

const PostUserProfileImg = styled.img`
  width: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const PostDetailContainer = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const PostDetail = styled.p`
  font-size: 0.85em; 
  margin-top: 10px;
`;

const Timestamp = styled.p`
  color: #8e8e8e;
  font-size: 0.7em;
`;

const CommentListUl = styled.ul`
  margin: 0;
  padding: 0 15px 15px;
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

const CommentList = ({comments, username, caption, timestamp, setChosenComment}) => {
  return(
    <CommentListContainer>
      <PostContainer>
        <PostUserProfileImg src={userImage} alt=''/>
        <PostDetailContainer>
          <PostDetail><strong>{username}</strong> {caption}</PostDetail>
          <Timestamp>{getTimeStamp(timestamp)}</Timestamp>
        </PostDetailContainer>
      </PostContainer>
      <CommentListUl>
        {comments.map((comment)=><CommentItem setChosenComment={setChosenComment} key={comment.id} comment={comment}/>)}
      </CommentListUl>
    </CommentListContainer>
  )
};

export default CommentList;
