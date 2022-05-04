import React from 'react';
import styled from 'styled-components';

const SliderDot = styled.div`
  width: 6px;
  height: 6px;
  margin: 2px;
  border-radius: 50%;
`;

const SliderDotActive = styled(SliderDot)`
  background-color: #0095f6;
`;

const SliderDotPassive = styled(SliderDot)`
  background-color: #a8a8a8;
`;

const VisualMediaDot = ({isActive}) => {
  return isActive?<SliderDotActive></SliderDotActive>:<SliderDotPassive></SliderDotPassive>
};

export default VisualMediaDot;
