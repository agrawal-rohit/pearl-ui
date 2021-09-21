import { ColorValue } from "react-native";
import { useTheme } from "./useTheme";

/**
 * Hook to get the appropriate value based on the current color mode
 */
export const useColorModeValue = (
  lightColor: ColorValue,
  darkColor: ColorValue
) => {
  const { colorMode } = useTheme();

  if (colorMode === "light") return lightColor;

  return darkColor;
};
