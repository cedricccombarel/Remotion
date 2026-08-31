import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { antonFontFamily, schibstedGroteskFontFamily } from "../fonts";

const ORANGE = "#FF8C00";
const WHITE = "#FFFFFF";
const BLACK = "#000000";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const titleSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 11, mass: 0.7 },
  });

  const subtitleSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 13, mass: 0.6 },
  });

  const cardSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 16, mass: 0.9 },
  });

  const cardTilt = interpolate(frame, [14, 90], [-6, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shineX = interpolate(frame, [30, 75], [-140, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [95, 115], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitScale = interpolate(frame, [95, 115], [1, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: ORANGE,
          borderRadius: 999,
          padding: "18px 44px",
          scale: interpolate(badgeSpring, [0, 1], [0.4, 1], {
            output: "perceptual-scale",
          }),
          opacity: interpolate(badgeSpring, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontFamily: schibstedGroteskFontFamily,
            fontWeight: 700,
            fontSize: 34,
            color: WHITE,
            letterSpacing: 2,
          }}
        >
          RENTRÉE 2026
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          scale: exitScale,
          opacity: exitOpacity,
        }}
      >
        <div
          style={{
            marginTop: 64,
            padding: "0 80px",
            textAlign: "center",
            translate: `0px ${interpolate(titleSpring, [0, 1], [90, 0])}px`,
            opacity: interpolate(titleSpring, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 132,
              lineHeight: 1,
              color: WHITE,
              textTransform: "uppercase",
            }}
          >
            C'EST OFFICIEL !
          </span>
        </div>

        <div
          style={{
            marginTop: 44,
            marginLeft: 80,
            marginRight: 80,
            backgroundColor: WHITE,
            borderRadius: 32,
            padding: "28px 40px",
            scale: interpolate(subtitleSpring, [0, 1], [0.85, 1], {
              output: "perceptual-scale",
            }),
            opacity: interpolate(subtitleSpring, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 52,
              lineHeight: 1.1,
              color: BLACK,
              textTransform: "uppercase",
              textAlign: "center",
              display: "block",
            }}
          >
            Nous acceptons les Chèques Vacances
          </span>
        </div>

        <div
          style={{
            marginTop: 90,
            scale: interpolate(cardSpring, [0, 1], [0.7, 1], {
              output: "perceptual-scale",
            }),
            opacity: interpolate(cardSpring, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              width: 560,
              height: 340,
              borderRadius: 28,
              position: "relative",
              overflow: "hidden",
              background: `linear-gradient(135deg, ${ORANGE} 0%, #E67A00 100%)`,
              boxShadow: "0 40px 70px rgba(0,0,0,0.35)",
              transform: `perspective(1200px) rotateY(${cardTilt}deg) rotateX(4deg)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 36,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: antonFontFamily,
                  fontSize: 46,
                  color: WHITE,
                  letterSpacing: 1,
                }}
              >
                ANCV
              </span>
              <div
                style={{
                  width: 74,
                  height: 54,
                  borderRadius: 8,
                  background:
                    "linear-gradient(135deg, #E1DFD9 0%, #FFFFFF 60%, #C9C6BE 100%)",
                }}
              />
            </div>

            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 30,
                color: WHITE,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Chèques-Vacances
            </span>

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 140,
                height: "100%",
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
                translate: `${shineX}px 0px`,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
