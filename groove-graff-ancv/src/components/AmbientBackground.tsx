import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const ORANGE = "#FF8C00";
const DARK = "#1D231C";

export const AmbientBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const haloScale = interpolate(frame % 180, [0, 90, 180], [1, 1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const shapeAY = interpolate(frame % 240, [0, 120, 240], [-40, 40, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shapeBY = interpolate(frame % 300, [0, 150, 300], [30, -30, 30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shapeCRotate = interpolate(frame % 360, [0, 360], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ORANGE} 0%, rgba(255,140,0,0) 70%)`,
          opacity: 0.14,
          translate: "-500px -500px",
          scale: haloScale,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: "78%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          backgroundColor: DARK,
          opacity: 0.18,
          translate: `-210px ${-210 + shapeAY}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "10%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          backgroundColor: ORANGE,
          opacity: 0.08,
          translate: `-130px ${-130 + shapeBY}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "82%",
          left: "24%",
          width: 180,
          height: 180,
          borderRadius: 40,
          backgroundColor: DARK,
          opacity: 0.12,
          translate: "-90px -90px",
          rotate: `${shapeCRotate}deg`,
        }}
      />
    </div>
  );
};
