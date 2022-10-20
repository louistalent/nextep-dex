import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { CardTheme } from "./types";

export interface CardHeaderProps extends SpaceProps {
  variant?: keyof CardTheme["cardHeaderBackground"];
}

const CardHeader = styled.div<CardHeaderProps>`

`;

CardHeader.defaultProps = {
  p: "24px",
};

export default CardHeader;
