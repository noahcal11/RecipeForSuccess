import * as React from "react";
import Svg, { Path } from "react-native-svg";
const StarIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
      fill="gray"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={20}
    />
  </Svg>
);
export default StarIcon;
