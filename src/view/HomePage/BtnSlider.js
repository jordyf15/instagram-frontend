import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const SliderBtn = styled.button`
  border: none;
  background-color: #bbbbbc;
  border-radius: 50%;
  font-size: 1em;
  opacity: 0.85;
`;

const SliderBtnNext = styled(SliderBtn)`
  padding: 4px 8px 3px 9px;
  position: absolute;
  top: 50%;
  right: 10px;
`;

const SliderBtnPrev = styled(SliderBtn)`
  padding: 4px 10px 3px 9px;
  position: absolute;
  vertical-align:middle;
  top: 50%;
  left: 10px;
`;

const BtnSlider = ({moveSlide, direction}) => {
  return direction==='next'
  ?<SliderBtnNext onClick={moveSlide}>
    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
  </SliderBtnNext>
  :<SliderBtnPrev onClick={moveSlide}>
    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
  </SliderBtnPrev>
};

export default BtnSlider;
