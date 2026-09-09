import "./index.css";
import { Composition, Folder } from "remotion";
import { GrooveGraffAncv } from "./GrooveGraffAncv";
import { HookScene } from "./scenes/HookScene";
import { OfferScene } from "./scenes/OfferScene";
import { CtaScene } from "./scenes/CtaScene";
import { GrooveGraffJPOChant } from "./GrooveGraffJPOChant";
import { GrooveGraffInauguration } from "./GrooveGraffInauguration";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="GrooveGraffAncv-Scenes">
        <Composition
          id="Hook"
          component={HookScene}
          durationInFrames={115}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Offer"
          component={OfferScene}
          durationInFrames={145}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cta"
          component={CtaScene}
          durationInFrames={140}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Composition
        id="GrooveGraffAncv"
        component={GrooveGraffAncv}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GrooveGraffJPOChant"
        component={GrooveGraffJPOChant}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GrooveGraffInauguration"
        component={GrooveGraffInauguration}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
