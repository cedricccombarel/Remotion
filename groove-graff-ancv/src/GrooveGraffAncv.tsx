import React from "react";
import { Audio } from "@remotion/media";
import { Series, staticFile } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { OfferScene } from "./scenes/OfferScene";
import { CtaScene } from "./scenes/CtaScene";

export const GrooveGraffAncv: React.FC = () => {
  return (
    <>
      <Audio
        src={staticFile("audio/boom-bap-loop.mp3")}
        volume={0.35}
        loop
      />
      <Series>
        <Series.Sequence durationInFrames={90} name="Hook">
          <HookScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} name="Offer">
          <OfferScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90} name="Cta">
          <CtaScene />
        </Series.Sequence>
      </Series>
    </>
  );
};
