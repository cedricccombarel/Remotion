import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadSchibstedGrotesk } from "@remotion/google-fonts/SchibstedGrotesk";

export const { fontFamily: antonFontFamily } = loadAnton("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const { fontFamily: schibstedGroteskFontFamily } = loadSchibstedGrotesk(
  "normal",
  {
    weights: ["600", "700"],
    subsets: ["latin"],
  },
);
