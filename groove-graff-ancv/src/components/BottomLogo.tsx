import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const BottomLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const float = interpolate(frame % 150, [0, 75, 150], [0, -12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Img
      src={staticFile("logo.svg")}
      style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        width: 300,
        transform: "translateX(-50%)",
        translate: `0px ${float}px`,
        scale: interpolate(introSpring, [0, 1], [0.5, 1], {
          output: "perceptual-scale",
        }),
        opacity: interpolate(introSpring, [0, 1], [0, 1], {
          extrapolateRight: "clamp",
        }),
      }}
    />
  );
};
