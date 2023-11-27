import { useTheme } from "./useTheme";
import { ExpandedColors, PaletteColors } from "./../theme/src/types";
import { TinyColor } from "@ctrl/tinycolor";
import { getNestedObject } from "../theme/utils/type-helpers";

/**
 * Hook to get the most accessible foreground color value based on a provided background color
 * @param backgroundColor The color value of the background color
 * @param foregroundChoices The foreground color values to choose from. It expects an object which a 'light' key (for the lighter color) and a 'dark' key (for the darker color)
 * @returns The most accessible foreground color value
 */
export const useAccessibleColor = (
  backgroundColor: PaletteColors | string,
  foregroundChoices: { light: ExpandedColors; dark: ExpandedColors } = {
    light: "white",
    dark: "black",
  }
) => {
  // Get the current theme
  const { theme } = useTheme();

  // Get the final background color value
  let finalBackgroundColor;
  if ((backgroundColor as any).includes("#")) {
    finalBackgroundColor = backgroundColor;
  } else if ((backgroundColor as any).includes(".")) {
    finalBackgroundColor = getNestedObject(theme, [
      "palette",
      (backgroundColor as any).split(".")[0],
      (backgroundColor as any).split(".")[1],
    ]);
  } else {
    finalBackgroundColor = theme.palette[backgroundColor as any];
  }

  // Determine if the background color is light or dark
  const isColorLight =
    new TinyColor(finalBackgroundColor).getBrightness() > 150;

  // Return the most accessible foreground color value
  if (isColorLight) {
    // If the background color is light, return the dark foreground color
    return foregroundChoices.dark;
  } else {
    // If the background color is dark, return the light foreground color
    return foregroundChoices.light;
  }
};
