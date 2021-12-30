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

// Component configs
import SpinnerConfig from "../../../components/Atoms/Spinner/Spinner.config";
import ScreenConfig from "../../../components/Atoms/Screen/Screen.config";
import TextConfig from "../../../components/Atoms/Text/Text.config";
import ButtonConfig from "../../../components/Molecules/Button/Button.config";
import IconConfig from "../../../components/Atoms/Icon/Icon.config";
import TextLinkConfig from "../../../components/Molecules/TextLink/TextLink.config";
import InputConfig from "../../../components/Molecules/Input/Input.config";
import DividerConfig from "../../../components/Atoms/Divider/Divider.config";
import CheckBoxConfig from "../../../components/Molecules/CheckBox/CheckBox.config";
import ImageConfig from "../../../components/Molecules/Image/Image.config";
import RadioConfig from "../../../components/Molecules/Radio/Radio.config";
import BadgeConfig from "../../../components/Molecules/Badge/Badge.config";
import AvatarConfig from "../../../components/Molecules/Avatar/Avatar.config";
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
