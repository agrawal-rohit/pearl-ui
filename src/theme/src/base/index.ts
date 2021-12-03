import { breakpoints } from "./breakpoints";
import { BasePearlTheme, FinalPearlTheme } from "../types";

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

/**
 * Override particular parts of the baseTheme to create a custom theme as per you app's needs
 * @param customTheme custom theme object to be combined with the baseTheme
 * @returns
 */
export const extendTheme = (customTheme: Partial<BasePearlTheme>) => {
  return {
    palette: { ...baseTheme.palette, ...customTheme.palette },
    spacing: { ...baseTheme.spacing, ...customTheme.spacing },
    breakpoints: { ...baseTheme.breakpoints, ...customTheme.breakpoints },
    components: { ...baseTheme.components, ...customTheme.components },
    fonts: { ...baseTheme.fonts, ...customTheme.fonts },
    fontConfig: { ...baseTheme.fontConfig, ...customTheme.fontConfig },
    fontSizes: { ...baseTheme.fontSizes, ...customTheme.fontSizes },
    lineHeights: { ...baseTheme.lineHeights, ...customTheme.lineHeights },
    fontWeights: { ...baseTheme.fontWeights, ...customTheme.fontWeights },
    elevation: { ...baseTheme.elevation, ...customTheme.elevation },
    zIndices: { ...baseTheme.zIndices, ...customTheme.zIndices },
    borderRadii: { ...baseTheme.borderRadii, ...customTheme.borderRadii },
  };
};

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
  components: {
    Icon: IconConfig,
    Text: TextConfig,
    Screen: ScreenConfig,
    Spinner: SpinnerConfig,
    Button: ButtonConfig,
    TextLink: TextLinkConfig,
    Input: InputConfig,
    CheckBox: CheckBoxConfig,
    Radio: RadioConfig,
    Badge: BadgeConfig,
    Divider: DividerConfig,
    Image: ImageConfig,
    Avatar: AvatarConfig,
  },
};

type Custom = typeof baseTheme;

declare module "../../.." {
  interface CustomPearlTheme extends Custom {}
}
