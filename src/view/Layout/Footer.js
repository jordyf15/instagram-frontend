import React from 'react';
import styled from 'styled-components';

const FooterElement = styled.footer`
  color: #8e8e8e;
  font-size: 0.75em;
  text-align: center;
  padding: 20px 0;
`;

const Footer = () => {
  return (
    <FooterElement>&copy; 2022 Instagram from Meta</FooterElement>
  )
};

export default Footer;