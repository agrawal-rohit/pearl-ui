import { PaletteColors } from "../theme/src/types";
import { useTheme } from "./useTheme";

/**
 * Hook to get the appropriate value based on the current color mode
 * @param lightColor The color value to return when the app is in light mode
 * @param darkColor The color value to return when the app is in dark mode
 * @returns The color value based on the current color mode
 */
export const useColorModeValue = (
  lightColor: PaletteColors,
  darkColor: PaletteColors
): PaletteColors => {
  // Get the current color mode from the theme
  const { colorMode } = useTheme();

  // Return the appropriate color value based on the current color mode
  if (colorMode === "light") {
    return lightColor;
  } else {
    return darkColor;
  }
};
