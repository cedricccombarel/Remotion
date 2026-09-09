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
const YELLOW = "#FFD166";
const GREY = "#555555";

const TICKER_TEXT =
  "🎉 INAUGURATION OFFICIELLE • CE SAMEDI • COURBEVOIE • ENTRÉE GRATUITE • PLACES LIMITÉES • ";
const TICKER_COPY_WIDTH = 1460;
const TICKER_PERIOD = 367;

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

type DecorProps = {
  readonly emoji: string;
  readonly top?: number;
  readonly bottom?: number;
  readonly left?: number;
  readonly right?: number;
  readonly period: number;
  readonly phase: number;
};

const FloatingDecor: React.FC<DecorProps> = ({
  emoji,
  top,
  bottom,
  left,
  right,
  period,
  phase,
}) => {
  const frame = useCurrentFrame();
  const cycle = (frame + phase) % period;

  const drift = interpolate(cycle, [0, period / 2, period], [-12, 12, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tilt = interpolate(cycle, [0, period / 2, period], [-8, 8, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        fontSize: 150,
        lineHeight: 1,
        opacity: 0.15,
        translate: `0px ${drift}px`,
        rotate: `${tilt}deg`,
      }}
    >
      {emoji}
    </span>
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
    frame: frame - (65 + index * 5),
    fps,
    config: PUNCHY,
  });

  const focusStart = 105 + index * 15;
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

  const scene1Opacity = interpolate(frame, [62, 75], [1, 0], {
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

  const hero = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardSpring = spring({ frame: frame - 200, fps, config: PUNCHY });
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
  const ctaPulse = interpolate(
    Math.max(0, frame - 232) % 40,
    [0, 20, 40],
    [1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const logoSpring = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN }}>
      <FloatingDecor emoji="🎤" top={170} left={70} period={190} phase={0} />
      <FloatingDecor emoji="🎨" top={210} right={70} period={230} phase={60} />
      <FloatingDecor emoji="🎵" bottom={330} left={80} period={260} phase={120} />
      <FloatingDecor emoji="🎸" bottom={300} right={70} period={290} phase={40} />

      <AbsoluteFill
        style={{
          opacity: scene1Opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 50px",
            scale: interpolate(hero, [0, 1], [0.7, 1], {
              extrapolateLeft: "clamp",
            }),
            translate: `0px ${interpolate(hero, [0, 1], [70, 0], {
              extrapolateLeft: "clamp",
            })}px`,
            opacity: interpolate(hero, [0, 0.6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              backgroundColor: ORANGE,
              borderRadius: 999,
              padding: "16px 38px",
            }}
          >
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 30,
                color: WHITE,
                letterSpacing: 1.5,
                whiteSpace: "nowrap",
              }}
            >
              🎉 INAUGURATION OFFICIELLE
            </span>
          </div>

          <span
            style={{
              marginTop: 42,
              fontFamily: antonFontFamily,
              fontSize: 128,
              lineHeight: 1,
              color: WHITE,
              textTransform: "uppercase",
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
          >
            Groove &amp; Graff
          </span>

          <span
            style={{
              marginTop: 26,
              fontFamily: antonFontFamily,
              fontSize: 58,
              lineHeight: 1.1,
              color: YELLOW,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Ce samedi • 16h - 18h
          </span>

          <span
            style={{
              marginTop: 34,
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 700,
              fontSize: 40,
              color: BEIGE,
              textAlign: "center",
            }}
          >
            6 univers à vivre en 1 heure
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
          padding: "0 60px",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: BEIGE,
            borderRadius: 32,
            padding: "72px 52px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            scale: interpolate(cardSpring, [0, 1], [0.85, 1], {
              extrapolateLeft: "clamp",
            }),
          }}
        >
          <div
            style={{
              textAlign: "center",
              scale: interpolate(ctaTitleSpring, [0, 1], [0.75, 1], {
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
                fontSize: 48,
                lineHeight: 1.15,
                color: DARK,
                textTransform: "uppercase",
              }}
            >
              Attention : places limitées !
            </span>
          </div>

          <div
            style={{
              marginTop: 48,
              backgroundColor: ORANGE,
              borderRadius: 20,
              padding: "30px 44px",
              scale:
                interpolate(ctaButtonSpring, [0, 1], [0.6, 1], {
                  extrapolateLeft: "clamp",
                }) * ctaPulse,
              opacity: interpolate(ctaButtonSpring, [0, 0.6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 34,
                color: DARK,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
              }}
            >
              Clique sur le lien en bio
            </span>
          </div>

          <div style={{ marginTop: 42, opacity: urlOpacity }}>
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 32,
                color: DARK,
                textAlign: "center",
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
                fontSize: 24,
                color: GREY,
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
