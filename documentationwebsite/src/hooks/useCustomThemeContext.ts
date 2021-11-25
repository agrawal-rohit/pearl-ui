import { useColorMode } from "@chakra-ui/color-mode";
import useThemeContext from "@theme/hooks/useThemeContext";

export const useCustomThemeContext = () => {
  const { isDarkTheme } = useThemeContext();
  const { colorMode, toggleColorMode } = useColorMode();
  if (
    (isDarkTheme && colorMode === "light") ||
    (!isDarkTheme && colorMode === "dark")
  ) {
    toggleColorMode();
  }

  return {
    isDarkTheme,
  };
};
