import { AtomicComponentConfig } from "../../../theme/src/types";
import { DividerProps } from "./Divider";

export default {
  baseStyle: {
    orientation: "horizontal",
    bg: {
      light: "neutral.300",
      dark: "neutral.900",
    },
    thickness: 1,
    length: "100%",
  },
} as AtomicComponentConfig;
