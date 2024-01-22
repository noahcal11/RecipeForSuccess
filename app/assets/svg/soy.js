import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const SoyIcon = (props) => (
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
          opacity: 0.969,
        }}
        fill="#c3319f"
        d="M 19.5,7.5 C 19.5,9.83333 19.5,12.1667 19.5,14.5C 17.4274,17.5765 14.7608,19.9098 11.5,21.5C 10.1667,21.5 8.83333,21.5 7.5,21.5C 4.51062,19.9974 1.84395,17.9974 -0.5,15.5C -0.5,12.5 -0.5,9.5 -0.5,6.5C 6.57953,-1.62946 13.2462,-1.29612 19.5,7.5 Z"
      />
    </G>
    <G>
      <Path
        style={{
          opacity: 1,
        }}
        fill="#f4d6ed"
        d="M 6.5,6.5 C 11.6598,7.72827 11.6598,8.39494 6.5,8.5C 7.43695,10.8379 8.77028,13.0045 10.5,15C 9.33195,18.501 7.33195,19.1676 4.5,17C 10.8941,16.0153 11.0607,14.182 5,11.5C 4.38715,9.5048 4.88715,7.83814 6.5,6.5 Z"
      />
    </G>
  </Svg>
);
export default SoyIcon;
