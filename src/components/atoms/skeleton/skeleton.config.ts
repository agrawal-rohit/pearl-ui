import { AtomicComponentConfig } from "../../../theme/src/types";
import { SkeletonProps } from "./skeleton";

const SkeletonConfig: AtomicComponentConfig<SkeletonProps> = {
  baseStyle: {
    borderRadius: "m",
    startColor: {
      light: "neutral.100",
      dark: "neutral.700",
    },
    endColor: {
      light: "neutral.300",
      dark: "neutral.600",
    },
  },
};

export default SkeletonConfig;
