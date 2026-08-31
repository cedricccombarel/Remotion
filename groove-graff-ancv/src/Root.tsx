import "./index.css";
import { Composition, Folder } from "remotion";
import { GrooveGraffAncv } from "./GrooveGraffAncv";
import { HookScene } from "./scenes/HookScene";
import { OfferScene } from "./scenes/OfferScene";
import { CtaScene } from "./scenes/CtaScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="GrooveGraffAncv-Scenes">
        <Composition
          id="Hook"
          component={HookScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Offer"
          component={OfferScene}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cta"
          component={CtaScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Composition
        id="GrooveGraffAncv"
        component={GrooveGraffAncv}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
