import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { antonFontFamily, schibstedGroteskFontFamily } from "../fonts";

const GREEN = "#0F7462";
const ORANGE = "#FF8C00";
const DARK = "#1D231C";
const NEUTRAL = "#E1DFD9";
const WHITE = "#FFFFFF";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const taglineSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const buttonSpring = spring({
    frame: frame - 34,
    fps,
    config: { damping: 9, mass: 0.6 },
  });

  const footerOpacity = interpolate(frame, [46, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonPulse = interpolate(
    frame,
    [60, 75, 90],
    [1, 1.05, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", output: "perceptual-scale" },
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: GREEN,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: DARK,
          borderRadius: 40,
          padding: "72px 56px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          scale: interpolate(containerSpring, [0, 1], [0.82, 1], {
            output: "perceptual-scale",
          }),
          opacity: interpolate(containerSpring, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            textAlign: "center",
            translate: `0px ${interpolate(logoSpring, [0, 1], [40, 0])}px`,
            opacity: interpolate(logoSpring, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 104,
              lineHeight: 1,
              color: WHITE,
              textTransform: "uppercase",
            }}
          >
            Groove & Graff
          </span>
        </div>

        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            opacity: interpolate(taglineSpring, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 600,
              fontSize: 38,
              color: NEUTRAL,
            }}
          >
            L'école de musique & d'arts graphiques
          </span>
        </div>

        <div
          style={{
            marginTop: 56,
            backgroundColor: ORANGE,
            borderRadius: 999,
            padding: "30px 64px",
            scale:
              interpolate(buttonSpring, [0, 1], [0.5, 1], {
                output: "perceptual-scale",
              }) * buttonPulse,
            opacity: interpolate(buttonSpring, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 700,
              fontSize: 42,
              color: WHITE,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Cours d'essai gratuit
          </span>
        </div>

        <div
          style={{
            marginTop: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: footerOpacity,
          }}
        >
          <span
            style={{
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 600,
              fontSize: 30,
              color: WHITE,
            }}
          >
            📍 18 rue Ficatier, Courbevoie
          </span>
          <span
            style={{
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 600,
              fontSize: 30,
              color: WHITE,
            }}
          >
            🌐 grooveandgraff.fr • 07 46 11 99 05
          </span>
        </div>
      </div>
    </div>
  );
};
