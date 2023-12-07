import { MolecularComponentConfig } from "../../../theme/src/types";
import { BoxProps } from "../../atoms/box/box";
import { SpinnerProps } from "../../atoms/spinner/spinner";
import { ImageProps } from "./image";

export type ImageAtoms = {
  container: BoxProps;
  image: ImageProps;
  previewImage: ImageProps;
  fallbackImage: ImageProps;
  spinner: SpinnerProps;
};

const ImageConfig: MolecularComponentConfig<ImageAtoms> = {
  parts: ["container", "image", "previewImage", "fallbackImage", "spinner"],
  baseStyle: {
    container: {
      backgroundColor: "neutral.100",
      borderRadius: "l",
    },
    image: {
      loaderType: "spinner",
      isCached: true,
      overlayTransitionDuration: 300,
      tint: "dark",
    },
    spinner: {
      color: "neutral.400",
    },
  },
};

export default ImageConfig;
