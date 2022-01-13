import { useTheme } from "./useTheme";
import { ColorValue } from "react-native";
import {
  ExpandedColors,
  PaletteColors,
  ResponsiveValue,
} from "./../theme/src/types";
import { colorStyleFunction } from "./../theme/src/styleFunctions";
import { useStyledProps } from "./useStyledProps";
import { TinyColor } from "@ctrl/tinycolor";
import { getNestedObject } from "../theme/utils/typeHelpers";

/**
 * Hook to get the most accessible foreground color value based on a provided background color
 * @param backgroundColor The color value of the background color
 * @param foregroundChoices The foreground color values to choose from. It expects an object which a 'light' key (for the lighter color) and a 'dark' key (for the darker color)
 * @returns
 */
export const useAccessibleColor = (
  backgroundColor: PaletteColors | string,
  foregroundChoices: { light: ExpandedColors; dark: ExpandedColors } = {
    light: "white",
    dark: "black",
  }
) => {
  const { theme } = useTheme();

  let finalBackgroundColor;
  if ((backgroundColor as any).includes("#")) {
    finalBackgroundColor = backgroundColor;
  }

  // For color palettes with multiple shades
  else if ((backgroundColor as any).includes(".")) {
    finalBackgroundColor = getNestedObject(theme, [
      "palette",
      (backgroundColor as any).split(".")[0],
      (backgroundColor as any).split(".")[1],
    ]);
  } else {
    finalBackgroundColor = theme.palette[backgroundColor as any];
  }

  const isColorLight = new TinyColor(finalBackgroundColor).isLight();
  if (isColorLight) {
    return foregroundChoices.dark;
  }

  return foregroundChoices.light;
};
