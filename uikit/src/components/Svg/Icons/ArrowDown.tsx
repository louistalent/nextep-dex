import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import arrowDownImg from '../../../assets/icon/arrowDown.png';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <div {...props}>
      <img src={arrowDownImg} alt="arrow down img" width="32px" />
    </div>
  );
};

export default Icon;
