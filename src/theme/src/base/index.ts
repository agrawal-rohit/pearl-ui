import { breakpoints } from "./breakpoints";
import { borderRadii } from "./border-radii";
import { elevation } from "./elevation";
import { palette } from "./palette";
import { spacing } from "./spacing";
import { zIndices } from "./zIndices";
import {
  fontConfig,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
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
  letterSpacings,
  lineHeights,
  components,
};

/**
 * Override particular parts of the default theme to create a custom theme as per you app's needs
 * @param overrideConfig Configuration overrides to be combined with the default theme
 * @returns
 */
export const extendTheme = <
  T extends typeof baseTheme | (Record<string, any> & {}),
>(
  overrideConfig: T
) => {
  const finalTheme = merge(baseTheme, overrideConfig);
  return finalTheme as typeof baseTheme & T;
};
