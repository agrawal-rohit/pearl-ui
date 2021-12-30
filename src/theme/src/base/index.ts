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
import { isFunction, mergeWith } from "lodash";

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
  function customizer(source: any, override: any) {
    if (isFunction(source)) {
      return (...args: any[]) => {
        const sourceValue = source(...args);
        const overrideValue = isFunction(override)
          ? override(...args)
          : override;
        return mergeWith({}, sourceValue, overrideValue, customizer);
      };
    }
    return undefined;
  }

  const finalTheme = [overrideConfig].reduce((prevValue, currentValue) => {
    return mergeWith({}, prevValue, currentValue, customizer);
  }, baseTheme);

  return finalTheme as T & typeof baseTheme;
};
