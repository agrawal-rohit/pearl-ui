import { AtomicComponentConfig } from "../../../theme/src/types";
import { DividerProps } from "./divider";

const DividerConfig: AtomicComponentConfig<DividerProps> = {
  baseStyle: {
    orientation: "horizontal",
    bgColor: {
      light: "neutral.300",
      dark: "neutral.600",
    },
    thickness: 1,
    length: "100%",
  },
};

export default DividerConfig;
