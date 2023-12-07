import { AtomicComponentConfig } from "../../../theme/src/types";
import { IconProps } from "./icon";

const IconConfig: AtomicComponentConfig<IconProps> = {
  baseStyle: {
    color: {
      light: "neutral.900",
      dark: "neutral.50",
    },
  },
  sizes: {
    xs: {
      rawSize: 8,
    },
    s: {
      rawSize: 12,
    },
    m: {
      rawSize: 16,
    },
    l: {
      rawSize: 20,
    },
  },
  defaults: {
    size: "m",
  },
};

export default IconConfig;
