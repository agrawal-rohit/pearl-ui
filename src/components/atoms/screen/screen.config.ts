import { AtomicComponentConfig } from "../../../theme/src/types";
import { ScreenProps } from "./screen";

const ScreenConfig: AtomicComponentConfig<ScreenProps> = {
  baseStyle: {
    scrollable: true,
    showScrollBar: false,
    backgroundColor: {
      light: "neutral.50",
      dark: "neutral.800",
    },
    transition: {
      type: "spring",
      dampingRatio: 1,
      duration: 100,
    },
    padding: "4",
  },
};

export default ScreenConfig;
