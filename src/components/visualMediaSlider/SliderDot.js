import React from 'react';
import styled from 'styled-components';

const Dot = styled.div`
  width: 6px;
  height: 6px;
  margin: 2px;
  border-radius: 50%;
`;

const DotActive = styled(Dot)`
  background-color: #0095f6;
`;

const DotPassive = styled(Dot)`
  background-color: #a8a8a8;
`;

const VisualMediaDot = ({isActive}) => {
  return isActive?<DotActive></DotActive>:<DotPassive></DotPassive>
};

export default VisualMediaDot;
