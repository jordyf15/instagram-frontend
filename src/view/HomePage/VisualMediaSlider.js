import React, { useState } from 'react';
import styled from 'styled-components';
import userImage from '../../assets/profile-test.jpg';
import BtnSlider from './BtnSlider';
import VisualMediaDot from './VisualMediaDot';

const SliderContainer = styled.div`
  position:relative;
`;

const PostItemImg = styled.img`
  width: 100%;
`;

const SliderBtnContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const SliderDotContainer = styled.div`
  position: absolute;
  bottom: -20px;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const VisualMediaSlider = ({visualMediaUrls}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    if(slideIndex !== visualMediaUrls.length) {
      setSlideIndex(slideIndex+1);
    }
  };

  const prevSlide = () => {
    if(slideIndex !== 0) {
      setSlideIndex(slideIndex-1);
    }
  };
  return(
    <SliderContainer>
      <PostItemImg src={userImage} alt=''/>
      <SliderBtnContainer>
        {slideIndex!==0
        ?<BtnSlider moveSlide={prevSlide} direction='prev'/>
        :null}
        {slideIndex !== visualMediaUrls.length-1
        ?<BtnSlider moveSlide={nextSlide} direction='next'/>
        :null}
      </SliderBtnContainer>
      {visualMediaUrls.length>1
      ?<SliderDotContainer>
        {visualMediaUrls.map((visualMediaUrl, idx) => <VisualMediaDot
        isActive={slideIndex===idx} key={visualMediaUrl}></VisualMediaDot>)}
      </SliderDotContainer>
      :null}
    </SliderContainer>
  )
};

export default VisualMediaSlider;
