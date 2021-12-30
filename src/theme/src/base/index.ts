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

import {
  ColorPalette,
  AtomicComponentConfig,
  MolecularComponentConfig,
  FontConfig,
  ElevationConfig,
  Breakpoint,
} from "../types";
import components from "./components";

interface ThemeSkeleton {
  palette: {
    [key: string]: string | ColorPalette;
  };
  spacing: {
    [key: string]: number | string;
  };
  components: {
    [key: string]: AtomicComponentConfig | MolecularComponentConfig;
  };
  fonts: {
    [key: string]: string;
  };
  fontConfig: FontConfig;
  fontSizes: {
    [key: string]: number;
  };
  lineHeights: {
    [key: string]: number;
  };
  fontWeights: {
    [key: string]: string;
  };
  elevation: {
    [key: string]: ElevationConfig;
  };
  zIndices: {
    [key: string]: number;
  };
  borderRadii: {
    [key: string]: number | string;
  };
  breakpoints: {
    [key: string]: Breakpoint;
  };
}

export const baseTheme: ThemeSkeleton = {
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
  return merge(baseTheme, overrideConfig) as T & typeof baseTheme;
};
