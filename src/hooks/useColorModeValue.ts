import { PaletteColors } from "../theme/src/types";
import { useTheme } from "./useTheme";

/**
 * Hook to get the appropriate value based on the current color mode
 * @param lightColor The color value to return when the app is in light mode
 * @param darkColor The color value to return when the app is in dark mode
 * @returns
 */
export const useColorModeValue = (
  lightColor: PaletteColors,
  darkColor: PaletteColors
): PaletteColors => {
  const { colorMode } = useTheme();

  if (colorMode === "light") return lightColor;

  return darkColor;
};
