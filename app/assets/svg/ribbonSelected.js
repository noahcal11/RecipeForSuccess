import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const RibbonSelected = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    style={props.style}
    {...props}
  >
    <Circle
      cx={256}
      cy={160}
      r={128}
      fill="black"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <Path
      d="M143.65 227.82L48 400l86.86-.42a16 16 0 0113.82 7.8L192 480l88.33-194.32"
      fill="black"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <Path
      d="M366.54 224L464 400l-86.86-.42a16 16 0 00-13.82 7.8L320 480l-64-140.8"
      fill="black"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <Circle
      cx={256}
      cy={160}
      r={64}
      //fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
  </Svg>
);
export default RibbonSelected;