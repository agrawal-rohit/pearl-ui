import { ColorValue } from "react-native";
import { useTheme } from "./useTheme";

/**
 * Hook to
 */
export const useColorModeValue = (
  lightColor: ColorValue,
  darkColor: ColorValue
) => {
  const { colorMode } = useTheme();

  if (colorMode === "light") return lightColor;

  return darkColor;
};
