import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const EggIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="22px"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <G>
      <Path
        style={{
          opacity: 0.996,
        }}
        fill="#0137a4"
        d="M 19.5,6.5 C 19.5,9.16667 19.5,11.8333 19.5,14.5C 15.5619,20.5062 10.2286,22.0062 3.5,19C 1.92975,17.6032 0.596413,16.1032 -0.5,14.5C -0.5,11.8333 -0.5,9.16667 -0.5,6.5C 6.16667,-1.5 12.8333,-1.5 19.5,6.5 Z"
      />
    </G>
    <G>
      <Path
        style={{
          opacity: 1,
        }}
        fill="#bbc5e4"
        d="M 6.5,6.5 C 8.60395,6.2011 10.604,6.53443 12.5,7.5C 10.9547,8.45189 9.28801,8.78522 7.5,8.5C 7.5,9.5 7.5,10.5 7.5,11.5C 12.8333,12.1667 12.8333,12.8333 7.5,13.5C 7.5,14.5 7.5,15.5 7.5,16.5C 9.28801,16.2148 10.9547,16.5481 12.5,17.5C 10.3052,18.7691 8.13853,18.7691 6,17.5C 5.24465,13.7446 5.41131,10.0779 6.5,6.5 Z"
      />
    </G>
  </Svg>
);
export default EggIcon;
