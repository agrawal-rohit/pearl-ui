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
    xs: 4,
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
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    "2xl": 32,
  },
  elevation: {
    xs: {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
    s: {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 4,
    },
    m: {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 8,
    },
    l: {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 12,
    },
    xl: {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 16,
      },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 16,
    },
    "2xl": {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 20,
      },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 20,
    },
    "3xl": {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 24,
      },
      shadowOpacity: 0.1,
      shadowRadius: 24,
      elevation: 24,
    },
    "4xl": {
      shadowColor: "neutral-900",
      shadowOffset: {
        width: 0,
        height: 28,
      },
      shadowOpacity: 0.16,
      shadowRadius: 28,
      elevation: 28,
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
