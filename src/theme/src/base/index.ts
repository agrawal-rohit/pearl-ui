import { BasePearlTheme } from "../types";

import { borderRadii } from "./borderRadii";
import { elevation } from "./elevation";
import { palette } from "./palette";
import { spacing } from "./spacing";
import { zIndices } from "./zIndices";

// Component configs
import SpinnerConfig from "../../../components/Atoms/Spinner/Spinner.config";
import ScreenConfig from "../../../components/Atoms/Screen/Screen.config";
import TextConfig from "../../../components/Atoms/Text/Text.config";
import ButtonConfig from "../../../components/Molecules/Button/Button.config";
import IconConfig from "../../../components/Atoms/Icon/Icon.config";

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
    Icon: IconConfig,
    Text: TextConfig,
    Screen: ScreenConfig,
    Spinner: SpinnerConfig,
    Button: ButtonConfig,
  },
};