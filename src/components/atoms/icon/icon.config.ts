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
      rawSize: 12,
    },
    s: {
      rawSize: 17,
    },
    m: {
      rawSize: 22,
    },
    l: {
      rawSize: 27,
    },
  },
  defaults: {
    size: "m",
  },
};

export default IconConfig;
