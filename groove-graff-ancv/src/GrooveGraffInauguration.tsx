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
const DARK = "#1D231C";
const BEIGE = "#E6E5E0";
const ORANGE = "#FF8C00";
const WHITE = "#FFFFFF";
const RED = "#E23A2F";

const TICKER_TEXT =
  "⚠️ CE SAMEDI • COURBEVOIE • ENTRÉE GRATUITE • PLACES LIMITÉES • ";
const TICKER_COPY_WIDTH = 1000;
const TICKER_PERIOD = 150;

const PUNCHY = { damping: 7, stiffness: 220, mass: 0.4 };

const Ticker: React.FC = () => {
  const frame = useCurrentFrame();

  const shift = interpolate(
    frame % TICKER_PERIOD,
    [0, TICKER_PERIOD],
    [0, -TICKER_COPY_WIDTH],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 68,
        backgroundColor: DARK,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          translate: `${shift}px 0px`,
        }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <span
            key={copy}
            style={{
              width: TICKER_COPY_WIDTH,
              flexShrink: 0,
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 700,
              fontSize: 26,
              color: WHITE,
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
          >
            {TICKER_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
};

type UniverseCardProps = {
  readonly index: number;
  readonly title: string;
  readonly subtitle: string;
  readonly backgroundColor: string;
  readonly titleColor: string;
  readonly numeralColor: string;
  readonly outlined?: boolean;
};

const UniverseCard: React.FC<UniverseCardProps> = ({
  index,
  title,
  subtitle,
  backgroundColor,
  titleColor,
  numeralColor,
  outlined,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - (50 + index * 5),
    fps,
    config: PUNCHY,
  });

  const focusStart = 100 + index * 15;
  const focusScale = interpolate(
    frame,
    [focusStart, focusStart + 7, focusStart + 15],
    [1, 1.08, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const focusRing = interpolate(
    frame,
    [focusStart, focusStart + 7, focusStart + 15],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "relative",
        width: 468,
        height: 340,
        boxSizing: "border-box",
        backgroundColor,
        border: outlined ? "3px solid rgba(255,255,255,0.32)" : undefined,
        borderRadius: 30,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0 34px",
        gap: 8,
        scale:
          interpolate(pop, [0, 1], [0.4, 1], { extrapolateLeft: "clamp" }) *
          focusScale,
        translate: `0px ${interpolate(pop, [0, 1], [70, 0], {
          extrapolateLeft: "clamp",
        })}px`,
        opacity: interpolate(pop, [0, 0.6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <span
        style={{
          position: "absolute",
          bottom: -10,
          right: 10,
          fontFamily: antonFontFamily,
          fontSize: 140,
          lineHeight: 1,
          color: numeralColor,
          opacity: 0.2,
        }}
      >
        {index + 1}
      </span>

      <span
        style={{
          fontFamily: antonFontFamily,
          fontSize: 56,
          lineHeight: 1,
          color: titleColor,
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: schibstedGroteskFontFamily,
          fontWeight: 700,
          fontSize: 28,
          color: ORANGE,
        }}
      >
        {subtitle}
      </span>
      <span
        style={{
          fontFamily: schibstedGroteskFontFamily,
          fontWeight: 600,
          fontSize: 23,
          color: titleColor,
          opacity: 0.7,
        }}
      >
        10 min
      </span>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: 30,
          border: `5px solid ${ORANGE}`,
          opacity: focusRing,
        }}
      />
    </div>
  );
};

export const GrooveGraffInauguration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scene1Opacity = interpolate(frame, [48, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene2Opacity = interpolate(frame, [196, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene3Opacity = interpolate(frame, [200, 212], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const flashA = spring({ frame, fps, config: PUNCHY });
  const flashB = spring({ frame: frame - 10, fps, config: PUNCHY });

  const slam = spring({
    frame: frame - 20,
    fps,
    config: { damping: 6, mass: 0.3 },
  });

  const badgeBlink = interpolate(frame % 20, [0, 10, 20], [1, 0.45, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaZoom = spring({ frame: frame - 200, fps, config: PUNCHY });
  const ctaTitleSpring = spring({ frame: frame - 210, fps, config: PUNCHY });
  const ctaButtonSpring = spring({ frame: frame - 220, fps, config: PUNCHY });
  const urlOpacity = interpolate(frame, [232, 244], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const footerOpacity = interpolate(frame, [244, 256], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const waveAScale = interpolate(frame % 30, [0, 30], [1, 1.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waveAOpacity = interpolate(frame % 30, [0, 30], [0.55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waveBScale = interpolate((frame + 15) % 30, [0, 30], [1, 1.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waveBOpacity = interpolate((frame + 15) % 30, [0, 30], [0.55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoSpring = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN }}>
      <AbsoluteFill
        style={{
          opacity: scene1Opacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {frame < 10 ? (
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 150,
              lineHeight: 1,
              color: ORANGE,
              textTransform: "uppercase",
              scale: interpolate(flashA, [0, 1], [0.6, 1], {
                extrapolateLeft: "clamp",
              }),
            }}
          >
            Ce samedi
          </span>
        ) : null}

        {frame >= 10 && frame < 20 ? (
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 150,
              lineHeight: 1,
              color: WHITE,
              textTransform: "uppercase",
              scale: interpolate(flashB, [0, 1], [0.6, 1], {
                extrapolateLeft: "clamp",
              }),
            }}
          >
            16h - 18h
          </span>
        ) : null}

        {frame >= 20 ? (
          <div
            style={{
              padding: "0 60px",
              textAlign: "center",
              rotate: `${interpolate(slam, [0, 1], [-3, 0], {
                extrapolateLeft: "clamp",
              })}deg`,
              scale: interpolate(slam, [0, 1], [0.55, 1], {
                extrapolateLeft: "clamp",
              }),
              opacity: interpolate(slam, [0, 0.5], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: antonFontFamily,
                fontSize: 128,
                lineHeight: 1.05,
                color: WHITE,
                textTransform: "uppercase",
              }}
            >
              6 univers à vivre en 1 heure
            </span>
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            top: 104,
            right: 46,
            backgroundColor: RED,
            borderRadius: 999,
            padding: "13px 26px",
            opacity: badgeBlink,
          }}
        >
          <span
            style={{
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 700,
              fontSize: 26,
              color: WHITE,
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
          >
            🚨 DERNIERS ACCÈS
          </span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: scene2Opacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div style={{ display: "flex", gap: 30 }}>
            <UniverseCard
              index={0}
              title="Découvre"
              subtitle="Éveil Musical"
              backgroundColor={GREEN}
              titleColor={WHITE}
              numeralColor="#000000"
              outlined
            />
            <UniverseCard
              index={1}
              title="Crée"
              subtitle="MAO"
              backgroundColor={DARK}
              titleColor={WHITE}
              numeralColor={WHITE}
            />
          </div>
          <div style={{ display: "flex", gap: 30 }}>
            <UniverseCard
              index={2}
              title="Joue"
              subtitle="Piano"
              backgroundColor={BEIGE}
              titleColor={DARK}
              numeralColor="#000000"
            />
            <UniverseCard
              index={3}
              title="Ose"
              subtitle="Chant"
              backgroundColor={GREEN}
              titleColor={WHITE}
              numeralColor="#000000"
              outlined
            />
          </div>
          <div style={{ display: "flex", gap: 30 }}>
            <UniverseCard
              index={4}
              title="Imagine"
              subtitle="Dessin"
              backgroundColor={DARK}
              titleColor={WHITE}
              numeralColor={WHITE}
            />
            <UniverseCard
              index={5}
              title="Laisse ta marque"
              subtitle="Street Art"
              backgroundColor={BEIGE}
              titleColor={DARK}
              numeralColor="#000000"
            />
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: scene3Opacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 50px",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: DARK,
            borderRadius: 30,
            border: `5px solid ${ORANGE}`,
            boxShadow: "0 0 60px rgba(255,140,0,0.55)",
            padding: "62px 44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            scale: interpolate(ctaZoom, [0, 1], [0.8, 1], {
              extrapolateLeft: "clamp",
            }),
          }}
        >
          <div
            style={{
              textAlign: "center",
              scale: interpolate(ctaTitleSpring, [0, 1], [0.7, 1], {
                extrapolateLeft: "clamp",
              }),
              opacity: interpolate(ctaTitleSpring, [0, 0.6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: antonFontFamily,
                fontSize: 66,
                lineHeight: 1.08,
                color: WHITE,
                textTransform: "uppercase",
              }}
            >
              Attention : places très limitées !
            </span>
          </div>

          <div
            style={{
              position: "relative",
              marginTop: 46,
              scale: interpolate(ctaButtonSpring, [0, 1], [0.5, 1], {
                extrapolateLeft: "clamp",
              }),
              opacity: interpolate(ctaButtonSpring, [0, 0.6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 999,
                border: `4px solid ${ORANGE}`,
                scale: waveAScale,
                opacity: waveAOpacity,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 999,
                border: `4px solid ${ORANGE}`,
                scale: waveBScale,
                opacity: waveBOpacity,
              }}
            />
            <div
              style={{
                position: "relative",
                backgroundColor: ORANGE,
                borderRadius: 999,
                padding: "32px 46px",
                boxShadow: "0 0 45px rgba(255,140,0,0.75)",
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
                  whiteSpace: "nowrap",
                }}
              >
                Clique sur le lien en bio
              </span>
            </div>
          </div>

          <div style={{ marginTop: 40, opacity: urlOpacity }}>
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 34,
                color: BEIGE,
              }}
            >
              grooveandgraff.framer.website
            </span>
          </div>

          <div style={{ marginTop: 34, opacity: footerOpacity }}>
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 600,
                fontSize: 25,
                color: BEIGE,
                whiteSpace: "nowrap",
              }}
            >
              📍 18 rue Ficatier, Courbevoie • 📩 DM &quot;OPEN&quot;
            </span>
          </div>
        </div>
      </AbsoluteFill>

      <Ticker />

      <Img
        src={staticFile("logo.svg")}
        style={{
          position: "absolute",
          bottom: 35,
          left: "50%",
          width: 240,
          transform: "translateX(-50%)",
          scale: interpolate(logoSpring, [0, 1], [0.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(logoSpring, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
