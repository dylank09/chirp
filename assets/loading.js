import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: animateTransform */

const Loading = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: "auto",
      background: "#4c4c47",
      display: "block",
      shapeRendering: "auto",
      animationPlayState: "running",
      animationDelay: "0s",
    }}
    width={200}
    height={200}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <G
      style={{
        animationPlayState: "running",
        animationDelay: "0s",
      }}
    >
      <G
        style={{
          animationPlayState: "running",
          animationDelay: "0s",
        }}
        transform="matrix(.7 0 0 .7 15 15)"
      >
        <Path
          fillOpacity={0.81}
          fill="#2d2d2a"
          d="M50 50V0a50 50 0 0 1 50 50Z"
          style={{
            animationPlayState: "running",
            animationDelay: "0s",
          }}
        />
      </G>
      <G
        style={{
          animationPlayState: "running",
          animationDelay: "0s",
        }}
        transform="matrix(.7 0 0 .7 15 15)"
      >
        <Path
          fillOpacity={0.81}
          fill="#e5dcc5"
          d="M50 50V0a50 50 0 0 1 50 50Z"
          transform="rotate(90 50 50)"
          style={{
            animationPlayState: "running",
            animationDelay: "0s",
          }}
        />
      </G>
      <G
        style={{
          animationPlayState: "running",
          animationDelay: "0s",
        }}
        transform="matrix(.7 0 0 .7 15 15)"
      >
        <Path
          fillOpacity={0.81}
          fill="#8487a5"
          d="M50 50V0a50 50 0 0 1 50 50Z"
          transform="rotate(180 50 50)"
          style={{
            animationPlayState: "running",
            animationDelay: "0s",
          }}
        />
      </G>
      <G
        style={{
          animationPlayState: "running",
          animationDelay: "0s",
        }}
        transform="matrix(.7 0 0 .7 15 15)"
      >
        <Path
          fillOpacity={0.81}
          fill="#c14953"
          d="M50 50V0a50 50 0 0 1 50 50Z"
          transform="rotate(270 50 50)"
          style={{
            animationPlayState: "running",
            animationDelay: "0s",
          }}
        />
      </G>
    </G>
  </Svg>
);

export default Loading;
