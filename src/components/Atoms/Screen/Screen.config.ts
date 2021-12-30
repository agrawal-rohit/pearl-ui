import { AtomicComponentConfig } from "../../../theme/src/types";
import { ScreenProps } from "./Screen";

export default {
  baseStyle: {
    scrollable: true,
    showScrollBar: false,
    backgroundColor: {
      light: "neutral.50",
      dark: "neutral.800",
    },
    padding: "m",
  },
} as AtomicComponentConfig;
