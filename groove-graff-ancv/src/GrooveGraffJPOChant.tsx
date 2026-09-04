import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { antonFontFamily, schibstedGroteskFontFamily } from "./fonts";

const GREEN = "#0F7462";
const ORANGE = "#FF8C00";
const DARK = "#1D231C";
const WHITE = "#FFFFFF";
const LIGHT_AMBER = "#FFC670";

export const GrooveGraffJPOChant: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const circleAY = interpolate(frame % 220, [0, 110, 220], [-30, 30, -30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const circleBY = interpolate(frame % 280, [0, 140, 280], [24, -24, 24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const circleCScale = interpolate(frame % 200, [0, 100, 200], [1, 1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const scene1Entry = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene1Exit = interpolate(frame, [80, 95], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene1Opacity = scene1Entry * scene1Exit;
  const scene1ExitScale = interpolate(frame, [80, 95], [1, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const scene2Entry = interpolate(frame, [85, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene2Exit = interpolate(frame, [190, 205], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene2Opacity = scene2Entry * scene2Exit;

  const scene3Opacity = interpolate(frame, [195, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeSpring = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const titleSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, mass: 0.7 },
  });
  const dateSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const titleSlide2 = interpolate(frame, [85, 105], [120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity2 = interpolate(frame, [85, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pill1Spring = spring({ frame: frame - 105, fps, config: { damping: 12 } });
  const pill2Spring = spring({ frame: frame - 115, fps, config: { damping: 12 } });
  const pill3Spring = spring({ frame: frame - 125, fps, config: { damping: 12 } });

  const cardSpring = spring({
    frame: frame - 195,
    fps,
    config: { damping: 15, mass: 0.8 },
  });
  const ctaTitleSpring = spring({
    frame: frame - 205,
    fps,
    config: { damping: 13, mass: 0.6 },
  });
  const ctaButtonSpring = spring({
    frame: frame - 218,
    fps,
    config: { damping: 9, mass: 0.6 },
  });
  const infoOpacity = interpolate(frame, [230, 246], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buttonLoopFrame = Math.max(0, frame - 240);
  const buttonPulse = interpolate(
    buttonLoopFrame % 40,
    [0, 20, 40],
    [1, 1.05, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      output: "perceptual-scale",
    },
  );

  const logoSpring = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN }}>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "12%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          backgroundColor: ORANGE,
          opacity: 0.1,
          translate: `-190px ${-190 + circleAY}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "68%",
          left: "82%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          backgroundColor: DARK,
          opacity: 0.16,
          translate: `-160px ${-160 + circleBY}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          backgroundColor: ORANGE,
          opacity: 0.08,
          translate: "-260px -260px",
          scale: circleCScale,
        }}
      />

      <AbsoluteFill
        style={{
          opacity: scene1Opacity,
          scale: scene1ExitScale,
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
            padding: "16px 40px",
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
              fontSize: 32,
              color: WHITE,
              letterSpacing: 2,
            }}
          >
            100% GRATUIT
          </span>
        </div>

        <div
          style={{
            marginTop: 56,
            padding: "0 70px",
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
              fontSize: 104,
              lineHeight: 1.05,
              color: WHITE,
              textTransform: "uppercase",
            }}
          >
            Journée Découverte Chant 🎤
          </span>
        </div>

        <div
          style={{
            marginTop: 32,
            opacity: interpolate(dateSpring, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
            translate: `0px ${interpolate(dateSpring, [0, 1], [30, 0])}px`,
          }}
        >
          <span
            style={{
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 700,
              fontSize: 38,
              color: LIGHT_AMBER,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Ce dimanche 6 septembre
          </span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: scene2Opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
        }}
      >
        <div
          style={{
            padding: "0 70px",
            textAlign: "center",
            translate: `0px ${titleSlide2}px`,
            opacity: titleOpacity2,
          }}
        >
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 88,
              lineHeight: 1.05,
              color: WHITE,
              textTransform: "uppercase",
            }}
          >
            Des créneaux pour tous
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          <div
            style={{
              backgroundColor: DARK,
              borderRadius: 999,
              padding: "26px 56px",
              scale: interpolate(pill1Spring, [0, 1], [0.3, 1], {
                output: "perceptual-scale",
              }),
              opacity: interpolate(pill1Spring, [0, 1], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 40,
                color: WHITE,
                whiteSpace: "nowrap",
              }}
            >
              14H00 • ENFANTS
            </span>
          </div>

          <div
            style={{
              backgroundColor: ORANGE,
              borderRadius: 999,
              padding: "26px 56px",
              scale: interpolate(pill2Spring, [0, 1], [0.3, 1], {
                output: "perceptual-scale",
              }),
              opacity: interpolate(pill2Spring, [0, 1], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 40,
                color: WHITE,
                whiteSpace: "nowrap",
              }}
            >
              15H00 • ADOS & COLLÉGIENS
            </span>
          </div>

          <div
            style={{
              backgroundColor: DARK,
              borderRadius: 999,
              padding: "26px 56px",
              scale: interpolate(pill3Spring, [0, 1], [0.3, 1], {
                output: "perceptual-scale",
              }),
              opacity: interpolate(pill3Spring, [0, 1], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 40,
                color: WHITE,
                whiteSpace: "nowrap",
              }}
            >
              16H00 • ADULTES
            </span>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: scene3Opacity,
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
            borderRadius: 30,
            border: `3px solid ${ORANGE}`,
            padding: "70px 50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            scale: interpolate(cardSpring, [0, 1], [0.82, 1], {
              output: "perceptual-scale",
            }),
            opacity: interpolate(cardSpring, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              textAlign: "center",
              translate: `0px ${interpolate(ctaTitleSpring, [0, 1], [36, 0])}px`,
              opacity: interpolate(ctaTitleSpring, [0, 1], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: antonFontFamily,
                fontSize: 76,
                lineHeight: 1,
                color: WHITE,
                textTransform: "uppercase",
              }}
            >
              Places limitées !
            </span>
          </div>

          <div
            style={{
              marginTop: 48,
              backgroundColor: ORANGE,
              borderRadius: 999,
              padding: "28px 46px",
              scale:
                interpolate(ctaButtonSpring, [0, 1], [0.5, 1], {
                  output: "perceptual-scale",
                }) * buttonPulse,
              opacity: interpolate(ctaButtonSpring, [0, 1], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 36,
                color: WHITE,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Envoie &quot;Chant&quot; en DM
            </span>
          </div>

          <div
            style={{
              marginTop: 56,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: infoOpacity,
            }}
          >
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 600,
                fontSize: 28,
                color: WHITE,
              }}
            >
              📍 18 rue Ficatier, Courbevoie
            </span>
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 600,
                fontSize: 28,
                color: WHITE,
              }}
            >
              📞 07 46 11 99 05
            </span>
          </div>
        </div>
      </AbsoluteFill>

      <Img
        src={staticFile("logo.svg")}
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          width: 260,
          transform: "translateX(-50%)",
          scale: interpolate(logoSpring, [0, 1], [0.6, 1], {
            output: "perceptual-scale",
          }),
          opacity: interpolate(logoSpring, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
