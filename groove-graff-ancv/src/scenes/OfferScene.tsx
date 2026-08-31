import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { antonFontFamily, schibstedGroteskFontFamily } from "../fonts";

const ORANGE = "#FF8C00";
const DARK = "#1D231C";
const WHITE = "#FFFFFF";

type PillProps = {
  readonly label: string;
  readonly backgroundColor: string;
  readonly delay: number;
};

const DisciplinePill: React.FC<PillProps> = ({
  label,
  backgroundColor,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, mass: 0.6 },
  });

  return (
    <div
      style={{
        backgroundColor,
        borderRadius: 999,
        padding: "26px 52px",
        scale: interpolate(pillSpring, [0, 1], [0.3, 1], {
          output: "perceptual-scale",
        }),
        opacity: interpolate(pillSpring, [0, 1], [0, 1], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      <span
        style={{
          fontFamily: schibstedGroteskFontFamily,
          fontWeight: 700,
          fontSize: 44,
          color: WHITE,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const OfferScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleSlide = interpolate(frame, [0, 24], [140, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        gap: 64,
      }}
    >
      <div
        style={{
          padding: "0 70px",
          textAlign: "center",
          translate: `0px ${titleSlide}px`,
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontFamily: antonFontFamily,
            fontSize: 96,
            lineHeight: 1.05,
            color: WHITE,
            textTransform: "uppercase",
          }}
        >
          Financez tous vos cours
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 34,
        }}
      >
        <DisciplinePill
          label="Éveil Musical"
          backgroundColor={DARK}
          delay={26}
        />
        <DisciplinePill
          label="Musique & Chant"
          backgroundColor={ORANGE}
          delay={42}
        />
        <DisciplinePill
          label="Dessin & Street-Art"
          backgroundColor={DARK}
          delay={58}
        />
      </div>
    </div>
  );
};
