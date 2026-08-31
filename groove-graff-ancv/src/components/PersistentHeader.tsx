import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { antonFontFamily, schibstedGroteskFontFamily } from "../fonts";

const WHITE = "#FFFFFF";
const DARK = "#1D231C";

export const PersistentHeader: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 12, 210, 240], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 84,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: antonFontFamily,
          fontSize: 56,
          lineHeight: 1,
          color: WHITE,
          textTransform: "uppercase",
        }}
      >
        Groove & Graff
      </span>
      <div
        style={{
          marginTop: 14,
          backgroundColor: DARK,
          borderRadius: 999,
          padding: "8px 24px",
        }}
      >
        <span
          style={{
            fontFamily: schibstedGroteskFontFamily,
            fontWeight: 600,
            fontSize: 22,
            color: WHITE,
          }}
        >
          L'école de musique & d'arts graphiques
        </span>
      </div>
    </div>
  );
};
