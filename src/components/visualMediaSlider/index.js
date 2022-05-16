import React, { useState } from 'react';
import styled from 'styled-components';
import { requestImageUrl } from '../../utils/imageRequest';
import SliderBtn from './SliderBtn';
import SliderDot from './SliderDot';

const Container = styled.div`
  position:relative;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`;

const Img = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`;

const BtnContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 15px;
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
    <Container>
      <Img src={requestImageUrl(visualMediaUrls[slideIndex])} alt=''/>
      <BtnContainer>
        {slideIndex!==0
        ?<SliderBtn moveSlide={prevSlide} direction='prev'/>
        :null}
        {slideIndex !== visualMediaUrls.length-1
        ?<SliderBtn moveSlide={nextSlide} direction='next'/>
        :null}
      </BtnContainer>
      {visualMediaUrls.length>1
      ?<DotContainer>
        {visualMediaUrls.map((visualMediaUrl, idx) => <SliderDot
        isActive={slideIndex===idx} key={visualMediaUrl}></SliderDot>)}
      </DotContainer>
      :null}
    </Container>
  )
};

export default VisualMediaSlider;
