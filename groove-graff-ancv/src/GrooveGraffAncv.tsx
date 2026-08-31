import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { HookScene } from "./scenes/HookScene";
import { OfferScene } from "./scenes/OfferScene";
import { CtaScene } from "./scenes/CtaScene";
import { AmbientBackground } from "./components/AmbientBackground";
import { PersistentHeader } from "./components/PersistentHeader";
import { BottomLogo } from "./components/BottomLogo";

const GREEN = "#0F7462";

export const GrooveGraffAncv: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: GREEN }}>
      <Audio
        src={staticFile("audio/boom-bap-loop.mp3")}
        volume={0.35}
        loop
      />
      <AmbientBackground />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={115} name="Hook">
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={145} name="Offer">
          <OfferScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={140} name="Cta">
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <PersistentHeader />
      <BottomLogo />
    </AbsoluteFill>
  );
};
