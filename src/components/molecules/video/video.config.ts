import { MolecularComponentConfig } from "../../../theme/src/types";
import { BoxProps } from "../../atoms/box/box";
import { SpinnerProps } from "../../atoms/spinner/spinner";
import { VideoProps, PearlRNImageProps } from "./video";

export type VideoAtoms = {
  container: BoxProps;
  video: VideoProps;
  previewImage: PearlRNImageProps;
  fallbackImage: PearlRNImageProps;
  spinner: SpinnerProps;
};

const VideoConfig: MolecularComponentConfig<VideoAtoms> = {
  parts: ["container", "video", "previewImage", "fallbackImage", "spinner"],
  baseStyle: {
    container: {
      backgroundColor: "neutral.100",
      borderRadius: "l",
    },
    video: {
      loaderType: "spinner",
      sourceDelay: 0,
      overlayTransitionDuration: 300,
      tint: "dark",
    },
    spinner: {
      color: "neutral.400",
    },
  },
};

export default VideoConfig;
