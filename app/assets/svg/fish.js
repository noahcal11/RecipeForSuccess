import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const FishIcon = (props) => (
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
          opacity: 1,
        }}
        fill="#d9ab6c"
        d="M 19.5,6.5 C 19.5,9.16667 19.5,11.8333 19.5,14.5C 15.5619,20.5062 10.2286,22.0062 3.5,19C 1.92975,17.6032 0.596413,16.1032 -0.5,14.5C -0.5,11.8333 -0.5,9.16667 -0.5,6.5C 6.16667,-1.5 12.8333,-1.5 19.5,6.5 Z"
      />
    </G>
    <G>
      <Path
        style={{
          opacity: 1,
        }}
        fill="#f2e3cf"
        d="M 6.5,6.5 C 8.60395,6.2011 10.604,6.53443 12.5,7.5C 11.3112,8.42869 9.97782,8.76202 8.5,8.5C 8.5,9.5 8.5,10.5 8.5,11.5C 13.8333,12.1667 13.8333,12.8333 8.5,13.5C 8.78522,15.288 8.45189,16.9547 7.5,18.5C 6.50909,14.5546 6.17575,10.5546 6.5,6.5 Z"
      />
    </G>
  </Svg>
);
export default FishIcon;
