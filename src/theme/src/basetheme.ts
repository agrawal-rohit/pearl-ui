import ActivityIndicatorConfig from "../../components/Atoms/ActivityIndicator/ActivityIndicator.config";
import ScreenConfig from "../../components/Atoms/Screen/Screen.config";
import TextConfig from "../../components/Atoms/Text/Text.config";
import { basePalette } from "../utils/basePalette";
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
  palette: {
    ...basePalette,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    "2xl": 40,
    "3xl": 48,
    "4xl": 56,
    "5xl": 64,
    "6xl": 72,
    "7xl": 80,
    "8xl": 88,
    "9xl": 96,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    "2xl": 32,
  },
  elevation: {
    s: {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.16,
      shadowRadius: 4,
      elevation: 2,
    },
    m: {
      shadowColor: "#373D40",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.16,
      shadowRadius: 8,
      elevation: 4,
    },
    l: {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.16,
      shadowRadius: 16,
      elevation: 6,
    },
    xl: {
      shadowColor: "#373D40",
      shadowOffset: {
        width: 0,
        height: 16,
      },
      shadowOpacity: 0.16,
      shadowRadius: 32,
      elevation: 8,
    },
  },
  zIndices: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  components: {
    Text: TextConfig,
    Screen: ScreenConfig,
    ActivityIndicator: ActivityIndicatorConfig,
  },
};
