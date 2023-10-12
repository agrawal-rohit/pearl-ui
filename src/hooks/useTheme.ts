import { useContext } from "react";
import { IThemeContext, themeContext } from "../theme/src/theme-context";

/**
 * Hook to get access to the active theme object, active color mode, and a function to toggle the active color mode
 */
export const useTheme = () => useContext(themeContext) as IThemeContext;
