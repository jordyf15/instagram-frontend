import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import VisualMediasInput from '../CreatePostModal/VisualMediasInput';
import CaptionInput from './CaptionInput';
import styled from 'styled-components';
import DiscardPostModal from './DiscardPostModal';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/slices/postSlice';

const H2 = styled.h2`
  font-size: 1em;
  font-weight: 600;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 10px;
  margin-bottom: 0;
`;

const Background = styled.div`
  background-color: rgba(0,0,0,0.85);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top:0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2em;
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Container = styled.div`
  background-color: white;
  text-align: center;
  width: 100vw;
  max-width: 350px;
  height: 90vh;
  max-height: 400px;
  display:flex;
  flex-direction: column;
  @media (min-width: 350px) {
    border-radius: 10px;
  }
  @media (min-width: 730px) {
    max-width: 550px;
    max-height: 550px;
  }
`;

const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
`;

const BackBtn = styled.button`
  margin-left: 15px;
  border:none;
  background: none;
  font-size: 1.5em;
`;

const ShareBtn = styled.button`
  margin-right: 15px;
  border:none;
  background: none;
  color: #0095f6;
  font-weight: bold;
  font-family: 'Roboto';
`;
const CreatePostModal = ({closeCreatePostModal}) => {
  const [visualMedias, setVisualMedias] = useState([]);
  const [caption, setCaption] = useState('');
  const [showDiscardPostModal, setShowDiscardPostModal] = useState(false);
  const dispatch = useDispatch();

  const handleChangeVisualMedias = (newVisualMedias) => {
    setVisualMedias(newVisualMedias);
  }

  const emptyVisualMedias = () => {
    setShowDiscardPostModal(false);
    setVisualMedias([]);
  }

  const hideDiscardPostModal = () => {
    setShowDiscardPostModal(false);
  }

  const displayDiscardPostModal = () => {
    setShowDiscardPostModal(true);
  }

  const handleClick = (e) => {
    e.stopPropagation();
  }

  const sharePost = () => {
    const files = []
    for(let i = 0; i< visualMedias.length; i++){
      files.push(visualMedias[i]);
    }
    dispatch(createPost({visualMedias: files, caption}))
    .unwrap()
    .then((response) => {
      // masukin ke redux store nanti
      closeCreatePostModal();
    });
  }
  return(
    <Background onClick={closeCreatePostModal}>
      <CloseBtn><FontAwesomeIcon icon={faXmark}/></CloseBtn>
      <Container onClick={handleClick}>
        {
          visualMedias.length>0
          ?<>
            <ContainerHeader>
              <BackBtn onClick={displayDiscardPostModal}><FontAwesomeIcon icon={faArrowLeftLong}/></BackBtn>
              <H2>Create new post</H2>
              <ShareBtn onClick={sharePost}>Share</ShareBtn>
            </ContainerHeader>
            <CaptionInput value={caption} handleChange={setCaption}/>
          </>
          :<>
            <H2>Create new post</H2>
            <VisualMediasInput handleChange={handleChangeVisualMedias}/>
          </>
        }
      </Container>
      {
        visualMedias.length>0 && showDiscardPostModal
        ?<DiscardPostModal hideDiscardPostModal={hideDiscardPostModal} emptyVisualMedias={emptyVisualMedias}/>
        :null
      }
    </Background>
  )
};

export default CreatePostModal;
