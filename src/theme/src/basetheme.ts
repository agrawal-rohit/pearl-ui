import ActivityIndicatorConfig from "../../components/Atoms/ActivityIndicator/ActivityIndicator.config";
import ScreenConfig from "../../components/Atoms/Screen/Screen.config";
import TextConfig from "../../components/Atoms/Text/Text.config";
import { borderRadii } from "./base/borderRadii";
import { elevation } from "./base/elevation";
import { palette } from "./base/palette";
import { spacing } from "./base/spacing";
import { zIndices } from "./base/zIndices";
import { BasePearlTheme } from "./types";

/**
 * Override particular parts of the baseTheme to create a custom theme as per you app's needs
 * @param customTheme custom theme object to be combined with the baseTheme
 * @returns
 */
export const extendTheme = (
  customTheme: Partial<BasePearlTheme>
): BasePearlTheme => {
  return {
    palette: { ...baseTheme.palette, ...customTheme.palette },
    spacing: { ...baseTheme.spacing, ...customTheme.spacing },
    components: { ...baseTheme.components, ...customTheme.components },
    elevation: { ...baseTheme.elevation, ...customTheme.elevation },
    zIndices: { ...baseTheme.zIndices, ...customTheme.zIndices },
    borderRadii: { ...baseTheme.borderRadii, ...customTheme.borderRadii },
  };
};

export const baseTheme: BasePearlTheme = {
  palette,
  spacing,
  borderRadii,
  elevation,
  zIndices,
  components: {
    Text: TextConfig,
    Screen: ScreenConfig,
    ActivityIndicator: ActivityIndicatorConfig,
  },
};
