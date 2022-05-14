import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEllipsis, faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import userImage from '../../assets/profile-test.jpg';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import useFocus from '../../customHooks/useFocus';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, deletePostLike, getPostComments, likePost } from '../../redux/slices/postSlice';
import CommentOptionModal from './CommentOptionModal';
import PostOptionModal from '../../components/PostOptionModal';
import EditPostModal from '../EditPostModal';
import VisualMediaSlider from '../../components/visualMediaSlider';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 90vh;
  max-height: 400px;
  @media (min-width: 350px) {
    width: 90vw;
  }
  @media (min-width: 730px) {
    max-height: 550px;
    max-width: 1000px;
  }
`;

const CommentsContainer = styled.div`
  background-color: white;
  text-align: center;
  display:flex;
  flex-direction: column;
  flex-grow: 1;
  @media (min-width: 350px) {
    border-radius: 5px;
  }
  @media (min-width: 730px) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const VisualMediaContainer = styled.div`
  flex-grow: 1;
  background-color: black;
  display: none;
  @media (min-width: 730px) {
    display: flex;
    align-items: center;
  }
`;

const CloseModalBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2em;
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 2px solid #f7f7f7;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PostUserProfileImg = styled.img`
  width: 40px;
  border-radius: 50%;
`;

const PostUsername = styled.p`
  font-weight: bold;
  font-size: 0.85em;
  margin-left: 15px;
`;

const OptionsBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.2em;
`;

const WidgetContainer = styled.div`
  border-top: 1px solid #f7f7f7;
  display: flex;
  justify-content: flex-start;
  padding: 10px 15px;
`;

const ToggleLikeBtn = styled.button`
  border:none;
  background:none;
  font-size: 1.5em;
  padding: 0;
`;

const CommentBtn = styled.button`
  border:none;
  background: none;
  font-size: 1.5em;
  padding: 0;
  margin-left: 15px;
`;

const LikeCount = styled.p`
  font-weight: bold;
  font-size: 0.9em;
  text-align: left;
  margin: 0 0 0 15px;
`;

const Timestamp = styled.p`
  color: #8e8e8e;
  font-size: 0.65em;
  text-align: left;
  margin: 5px 0 10px 15px;
`;

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

const PostDetail = ({postId, close}) => {
  const [chosenComment, setChosenComment] = useState(null);
  const [showPostOptionModal, setShowPostOptionModal] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state)=>state.post.filter((p)=>p.id===postId)[0]);
  const user = useSelector((state)=>state.user);
  const [inputRef, setInputFocus] = useFocus();
  const handleClickContainer = (e) => {
    e.stopPropagation();
  }

  useEffect(() => {
    dispatch(getPostComments(postId))
  }, [dispatch, postId]);

  const handleLikePost = () => {
    dispatch(likePost(post.id))
  };

  const handleDislikePost = () => {
    dispatch(deletePostLike({postId: post.id, likeId: post.like.id}))
  };

  const closeCommentOptionModal = () => {
    setChosenComment(null);
  };

  const openPostOptionModal = () => {
    setShowPostOptionModal(true);
  };

  const closePostOptionModal = () => {
    setShowPostOptionModal(false);
  };

  const handleDeletePost = async() => {
    await dispatch(deletePost(post.id));
    closePostOptionModal();
    close();
  }

  const openEditPostModal = () => {
    setShowEditPostModal(true);
  };

  const closeEditPostModal = () => {
    setShowEditPostModal(false);
  };

  return (
    <Background onClick={close}>
      {
        chosenComment
        ?<CommentOptionModal comment={chosenComment} closeModal={closeCommentOptionModal}/>
        :null
      }
      {
        showPostOptionModal
        ?<PostOptionModal closeModal={closePostOptionModal} openEditModal={openEditPostModal} handleDelete={handleDeletePost}/>
        :null
      }
      {
        showEditPostModal
        ?<EditPostModal closeModal={closeEditPostModal} postId={postId}/>
        :null
      }
      <CloseModalBtn onClick={close}><FontAwesomeIcon icon={faXmark}/></CloseModalBtn>
      <Container onClick={handleClickContainer}>
        <VisualMediaContainer>
          <VisualMediaSlider visualMediaUrls={post.visual_media_urls}/>
        </VisualMediaContainer>
        <CommentsContainer>
          <Header>
            <UserInfoContainer>
              <PostUserProfileImg src={userImage} alt=''/>
              <PostUsername>{post.user.username}</PostUsername>
            </UserInfoContainer>
            {
              post.user.id === user.id
              ?<OptionsBtn onClick={openPostOptionModal}><FontAwesomeIcon icon={faEllipsis}/></OptionsBtn>
              :null
            }
          </Header>
              <CommentList setChosenComment={setChosenComment} comments={post.comments} profileImgUrl={post.user.profile_pictures} username={post.user.username}
                caption={post.caption} timestamp={post.updated_date}/>
              <WidgetContainer>
                {post.like
                ?<ToggleLikeBtn onClick={handleDislikePost}><FontAwesomeIcon icon={fullHeart}/></ToggleLikeBtn>
                :<ToggleLikeBtn onClick={handleLikePost}><FontAwesomeIcon icon={emptyHeart}/></ToggleLikeBtn>}
                <CommentBtn onClick={setInputFocus}><FontAwesomeIcon icon={faComment}/></CommentBtn>
              </WidgetContainer>
              <LikeCount>{post.like_count} likes</LikeCount>
              <Timestamp>{getTimeStamp(post.updated_date)}</Timestamp>
              <CommentForm postId={post.id} inputRef={inputRef}/>
        </CommentsContainer>
      </Container>
    </Background>
  )
};

export default PostDetail;
