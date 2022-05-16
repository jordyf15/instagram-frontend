import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TextArea from './TextArea';
import { updatePost } from '../../redux/slices/postSlice';
import { DEFAULT_PROFILE_PICTURE_LINK, requestImageUrl } from '../../utils/imageRequest';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const Container = styled.div`
  background-color: white;
  width: 100%;
  max-width: 350px;
  @media (min-width: 350px) {
    border-radius: 15px;
  }
  @media (min-width: 730px) {
    max-width: 550px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
`;

const CancelBtn = styled.button`
  background: none;
  border:none;
  font-family: 'Roboto';
  font-size: 0.9em;
  margin-left: 10px;
  cursor: pointer;
`;

const DoneBtn = styled.button`
  background: none;
  border:none;
  font-family: 'Roboto';
  font-size: 0.9em;
  color: #0095f6;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
`;

const H3 = styled.h3`
  font-size: 1em;
  margin: 10px 0;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
`;

const UserImg = styled.img`
  width: 30px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  margin-right: 15px;
`;

const Username = styled.p`
  font-size: 0.95em;
  font-weight: bold;
  margin: 0;
`;

const CaptionLengthCount = styled.p`
  text-align: right;
  color: #c7c7c7;
  font-size: 0.75em;
  margin: 0;
  padding: 15px;
`;
const EditPostModal = ({postId, closeModal}) => {
  const post = useSelector((state)=>state.post.filter((post)=>post.id===postId)[0]);
  const [caption, setCaption] = useState(post.caption);
  const dispatch = useDispatch();
  const handleClickContainer = (e) => {
    e.stopPropagation();
  };
  const handleClickBackground = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const handleDone = async() => {
    await dispatch(updatePost({postId: post.id, caption}));
    closeModal();
  }

  return (
    <Background onClick={handleClickBackground}>
      <Container onClick={handleClickContainer}>
        <Header>
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
          <H3>Edit Info</H3>
          <DoneBtn onClick={handleDone}>Done</DoneBtn>
        </Header>
        <UserInfoContainer>
          {
            post.user.profile_pictures
            ?<UserImg src={requestImageUrl(post.user.profile_pictures[0].url)} alt=''/>
            :<UserImg src={requestImageUrl(DEFAULT_PROFILE_PICTURE_LINK)} alt=''/>
          }
          <Username>{post.user.username}</Username>
        </UserInfoContainer>
        <div>
          <TextArea value={caption} handleChange={setCaption}/>
          <CaptionLengthCount>{caption.length}/2200</CaptionLengthCount>
        </div>
      </Container>
    </Background>
  )
};

export default EditPostModal;
