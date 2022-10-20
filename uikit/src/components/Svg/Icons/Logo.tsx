import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../../../assets/image/logo.png";
const StyledImg = styled.img`
  width: 160px;
  ${({ theme }) => theme.mediaQueries.nav} {
  width: 200px;
  }
`;
const Icon: React.FC = () => {
  return (
    <StyledImg src={logo} alt={logo} />
  );
};

export default Icon;
