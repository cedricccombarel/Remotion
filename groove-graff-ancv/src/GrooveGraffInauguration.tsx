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
const AMBER = "#FFC670";

type StepCardProps = {
  readonly emoji: string;
  readonly verb: string;
  readonly label: string;
  readonly backgroundColor: string;
  readonly delay: number;
};

const StepCard: React.FC<StepCardProps> = ({
  emoji,
  verb,
  label,
  backgroundColor,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const onBeige = backgroundColor === BEIGE;

  return (
    <div
      style={{
        width: 460,
        height: 232,
        backgroundColor,
        borderRadius: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "0 20px",
        scale: interpolate(cardSpring, [0, 1], [0.55, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          output: "perceptual-scale",
        }),
        opacity: interpolate(cardSpring, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <span style={{ fontSize: 50, lineHeight: 1 }}>{emoji}</span>
      <span
        style={{
          fontFamily: antonFontFamily,
          fontSize: 38,
          lineHeight: 1.1,
          color: onBeige ? DARK : WHITE,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {verb}
      </span>
      <span
        style={{
          fontFamily: schibstedGroteskFontFamily,
          fontWeight: 600,
          fontSize: 25,
          color: onBeige ? DARK : BEIGE,
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: schibstedGroteskFontFamily,
          fontWeight: 700,
          fontSize: 21,
          color: onBeige ? DARK : ORANGE,
          letterSpacing: 1,
        }}
      >
        10 MIN
      </span>
    </div>
  );
};

export const GrooveGraffInauguration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const circleAY = interpolate(frame % 240, [0, 120, 240], [-28, 28, -28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const circleBY = interpolate(frame % 300, [0, 150, 300], [26, -26, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const circleCScale = interpolate(frame % 210, [0, 105, 210], [1, 1.09, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const scene1Opacity =
    interpolate(frame, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) *
    interpolate(frame, [60, 75], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const scene1ExitScale = interpolate(frame, [60, 75], [1, 0.78], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const scene2Opacity =
    interpolate(frame, [65, 80], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) *
    interpolate(frame, [205, 220], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const scene3Opacity = interpolate(frame, [210, 225], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeSpring = spring({ frame, fps, config: { damping: 12 } });
  const titleSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12 },
  });
  const subtitleSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12 },
  });

  const headerSlide2 = interpolate(frame, [65, 85], [70, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerOpacity2 = interpolate(frame, [65, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badge3Spring = spring({
    frame: frame - 210,
    fps,
    config: { damping: 13 },
  });
  const card3Spring = spring({
    frame: frame - 216,
    fps,
    config: { damping: 15, mass: 0.8 },
  });
  const title3Spring = spring({
    frame: frame - 226,
    fps,
    config: { damping: 13 },
  });
  const ctaSpring = spring({
    frame: frame - 238,
    fps,
    config: { damping: 9 },
  });
  const urlOpacity = interpolate(frame, [252, 266], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const infoOpacity = interpolate(frame, [262, 278], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaPulse = interpolate(
    Math.max(0, frame - 258) % 36,
    [0, 18, 36],
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
          top: "16%",
          left: "14%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          backgroundColor: ORANGE,
          opacity: 0.09,
          translate: `-200px ${-200 + circleAY}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "72%",
          left: "84%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          backgroundColor: DARK,
          opacity: 0.15,
          translate: `-170px ${-170 + circleBY}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          width: 540,
          height: 540,
          borderRadius: "50%",
          backgroundColor: ORANGE,
          opacity: 0.07,
          translate: "-270px -270px",
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
            padding: "16px 38px",
            scale: interpolate(badgeSpring, [0, 1], [0.4, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
            opacity: interpolate(badgeSpring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
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
            100% GRATUIT • COURBEVOIE
          </span>
        </div>

        <div
          style={{
            marginTop: 52,
            padding: "0 62px",
            textAlign: "center",
            translate: `0px ${interpolate(titleSpring, [0, 1], [110, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px`,
            opacity: interpolate(titleSpring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 112,
              lineHeight: 1.12,
              color: WHITE,
              textTransform: "uppercase",
            }}
          >
            Inauguration &amp; Parcours Découverte
          </span>
        </div>

        <div
          style={{
            marginTop: 42,
            padding: "0 62px",
            textAlign: "center",
            translate: `0px ${interpolate(subtitleSpring, [0, 1], [50, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px`,
            opacity: interpolate(subtitleSpring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 54,
              lineHeight: 1.1,
              color: ORANGE,
              textTransform: "uppercase",
            }}
          >
            Ce samedi 12 septembre • 16h - 18h
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
        }}
      >
        <div
          style={{
            padding: "0 70px",
            textAlign: "center",
            translate: `0px ${headerSlide2}px`,
            opacity: headerOpacity2,
          }}
        >
          <span
            style={{
              fontFamily: antonFontFamily,
              fontSize: 66,
              lineHeight: 1.05,
              color: AMBER,
              textTransform: "uppercase",
            }}
          >
            6 univers à vivre en 1 heure
          </span>
        </div>

        <div
          style={{
            marginTop: 52,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <StepCard
              emoji="🎵"
              verb="Découvre"
              label="Éveil Musical"
              backgroundColor={DARK}
              delay={85}
            />
            <StepCard
              emoji="🎧"
              verb="Crée"
              label="MAO"
              backgroundColor={DARK}
              delay={93}
            />
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <StepCard
              emoji="🎹"
              verb="Joue"
              label="Piano"
              backgroundColor={BEIGE}
              delay={101}
            />
            <StepCard
              emoji="🎤"
              verb="Ose"
              label="Chant"
              backgroundColor={DARK}
              delay={109}
            />
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <StepCard
              emoji="✏️"
              verb="Imagine"
              label="Dessin"
              backgroundColor={DARK}
              delay={117}
            />
            <StepCard
              emoji="🎨"
              verb="Laisse ta marque"
              label="Street Art"
              backgroundColor={BEIGE}
              delay={125}
            />
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: scene3Opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 55px",
        }}
      >
        <div
          style={{
            backgroundColor: ORANGE,
            borderRadius: 999,
            padding: "15px 34px",
            scale: interpolate(badge3Spring, [0, 1], [0.5, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
            opacity: interpolate(badge3Spring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: schibstedGroteskFontFamily,
              fontWeight: 700,
              fontSize: 25,
              color: WHITE,
              whiteSpace: "nowrap",
            }}
          >
            POUR TOUS : Enfants dès 6 mois • Ados • Adultes
          </span>
        </div>

        <div
          style={{
            marginTop: 40,
            width: "100%",
            backgroundColor: DARK,
            borderRadius: 30,
            padding: "64px 44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            scale: interpolate(card3Spring, [0, 1], [0.84, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
            opacity: interpolate(card3Spring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              textAlign: "center",
              translate: `0px ${interpolate(title3Spring, [0, 1], [34, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}px`,
              opacity: interpolate(title3Spring, [0, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: antonFontFamily,
                fontSize: 70,
                lineHeight: 1.05,
                color: WHITE,
                textTransform: "uppercase",
              }}
            >
              Réserve ton créneau !
            </span>
          </div>

          <div
            style={{
              marginTop: 44,
              backgroundColor: ORANGE,
              borderRadius: 999,
              padding: "26px 42px",
              scale:
                interpolate(ctaSpring, [0, 1], [0.5, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  output: "perceptual-scale",
                }) * ctaPulse,
              opacity: interpolate(ctaSpring, [0, 1], [0, 1], {
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
                color: WHITE,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
              }}
            >
              Clique sur le lien en bio
            </span>
          </div>

          <div style={{ marginTop: 30, opacity: urlOpacity }}>
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 700,
                fontSize: 28,
                color: AMBER,
              }}
            >
              grooveandgraff.framer.website
            </span>
          </div>

          <div
            style={{
              marginTop: 44,
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
                fontSize: 26,
                color: BEIGE,
              }}
            >
              📍 18 rue Ficatier, Courbevoie
            </span>
            <span
              style={{
                fontFamily: schibstedGroteskFontFamily,
                fontWeight: 600,
                fontSize: 26,
                color: BEIGE,
              }}
            >
              📩 DM &quot;OPEN&quot; ou 📞 07 46 11 99 05
            </span>
          </div>
        </div>
      </AbsoluteFill>

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
            output: "perceptual-scale",
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
