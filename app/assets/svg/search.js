import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
      fill="none"
      stroke="black"
      strokeMiterlimit={10}
      strokeWidth={50}
    />
    <Path
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={50}
      d="M338.29 338.29L448 448"
    />
  </Svg>
);
export default SearchIcon;
