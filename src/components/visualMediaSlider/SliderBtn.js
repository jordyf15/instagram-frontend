import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Button = styled.button`
  border: none;
  background-color: #bbbbbc;
  border-radius: 50%;
  font-size: 1em;
  opacity: 0.85;
`;

const BtnNext = styled(Button)`
  padding: 4px 8px 3px 9px;
  position: absolute;
  top: 50%;
  right: 10px;
`;

const BtnPrev = styled(Button)`
  padding: 4px 10px 3px 9px;
  position: absolute;
  vertical-align:middle;
  top: 50%;
  left: 10px;
`;

const SliderBtn = ({moveSlide, direction}) => {
  return direction==='next'
  ?<BtnNext onClick={moveSlide}>
    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
  </BtnNext>
  :<BtnPrev onClick={moveSlide}>
    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
  </BtnPrev>
};

export default SliderBtn;
