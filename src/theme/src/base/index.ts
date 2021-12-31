import { breakpoints } from "./breakpoints";
import { borderRadii } from "./borderRadii";
import { elevation } from "./elevation";
import { palette } from "./palette";
import { spacing } from "./spacing";
import { zIndices } from "./zIndices";
import {
  fontConfig,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
} from "./typography";
import { merge } from "lodash";
import components from "./components";

export const baseTheme = {
  palette,
  spacing,
  borderRadii,
  breakpoints,
  elevation,
  zIndices,
  fonts,
  fontConfig,
  fontSizes,
  fontWeights,
  lineHeights,
  components,
};

/**
 * Override particular parts of the default theme to create a custom theme as per you app's needs
 * @param overrideConfig Configuration overrides to be combined with the default theme
 * @returns
 */
export const extendTheme = <
  T extends typeof baseTheme | (Record<string, any> & {})
>(
  overrideConfig: T
) => {
  const finalTheme = {
    palette: { ...baseTheme.palette, ...overrideConfig.palette },
    spacing: { ...baseTheme.spacing, ...overrideConfig.spacing },
    components: { ...baseTheme.components, ...overrideConfig.components },
    elevation: { ...baseTheme.elevation, ...overrideConfig.elevation },
    zIndices: { ...baseTheme.zIndices, ...overrideConfig.zIndices },
    borderRadii: { ...baseTheme.borderRadii, ...overrideConfig.borderRadii },
  };

  return finalTheme as T & typeof baseTheme;
};
