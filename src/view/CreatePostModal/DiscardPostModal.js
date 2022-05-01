import React from 'react';
import styled from 'styled-components';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
  width: 80%;
  max-width: 230px;
  border-radius: 10px;
  @media (min-width: 730px) {
    max-width: 400px;
  }
`;

const DiscardHeading = styled.h3`
  padding: 10px 0;
  font-weight: bold;
  font-size: 1.15em;
`;

const DiscardBtn = styled.button`
  border:none;
  background: none;
  border-top: 1px solid #dbdbdb;
  padding: 15px 0;
  font-family: 'Roboto';
  font-weight: bolder;
  color: #ed4956;
  font-size: 0.9em;
`;

const CancelBtn = styled.button`
  border:none;
  background:none;
  border-top: 1px solid #dbdbdb;
  padding: 15px 0;
  font-family: 'Roboto';
`;

const DiscardPostModal = ({hideDiscardPostModal, emptyVisualMedias}) => {
  const removeDiscardPostModal = (e) => {
    e.stopPropagation();
    hideDiscardPostModal();
  }

  const handleClick = (e) => {
    e.stopPropagation();
  }
  return(
    <Background onClick={removeDiscardPostModal}>
      <Container onClick={handleClick}>
        <DiscardHeading>Discard post?</DiscardHeading>
        <DiscardBtn onClick={emptyVisualMedias}>Discard</DiscardBtn>
        <CancelBtn onClick={hideDiscardPostModal}>Cancel</CancelBtn>
      </Container>
    </Background>
  )
};

export default DiscardPostModal;
