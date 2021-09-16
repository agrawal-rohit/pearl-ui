import React, { useEffect, useState, createContext } from "react";
import { useColorScheme } from "react-native";
import { baseLightTheme, baseDarkTheme } from "./basetheme";
import { BasePearlTheme } from "./types";

type ThemeType = "light" | "dark" | "system";

export interface IThemeContext<Theme extends BasePearlTheme = BasePearlTheme> {
  /** Theme configuration object for the active color mode */
  theme: Theme;
  /** Active color mode */
  colorMode: ThemeType;
  /** Function to toggle the active color mode and corresponding theme */
  toggleTheme(): void;
}

interface ThemeProviderProps<Theme extends BasePearlTheme = BasePearlTheme> {
  /** Initial color mode for the theme (light, dark, system) */
  initialColorMode?: ThemeType;
  /** The configuration object for light theme */
  lightTheme?: Theme;
  /** The configuration object for dark theme */
  darkTheme?: Theme;
  /**React children */
  children: React.ReactNode;
}

export const themeContext = createContext({} as IThemeContext);

export const receivedThemeType = <Theme extends BasePearlTheme>(
  theme: Theme
): Theme => theme;

/**
 * The main provider component which controls the theme and color mode of the components in the entire application.
 */
export const ThemeProvider = ({
  initialColorMode = "light",
  lightTheme = baseLightTheme,
  darkTheme = baseDarkTheme,
  children,
}: ThemeProviderProps) => {
  const [colorMode, setColorMode] = useState<ThemeType>(initialColorMode);
  const [activeTheme, setActiveTheme] = useState<typeof lightTheme>(lightTheme);
  const systemThemeStyle = useColorScheme() as ThemeType;

  const changeThemeTo = (colorMode: ThemeType) => {
    if (colorMode === "dark") {
      setColorMode("dark");
      setActiveTheme(darkTheme);
      receivedThemeType<typeof darkTheme>(darkTheme);
    } else {
      setColorMode("light");
      setActiveTheme(lightTheme);
      receivedThemeType<typeof lightTheme>(lightTheme);
    }
  };

  const toggleTheme = () => {
    if (colorMode === "light") {
      changeThemeTo("dark");
    } else {
      changeThemeTo("light");
    }
  };

  useEffect(() => {
    // Set initial Theme
    if (colorMode === "light") {
      changeThemeTo("light");
    } else if (colorMode === "dark") {
      changeThemeTo("dark");
    } else if (colorMode === "system") {
      changeThemeTo(systemThemeStyle);
    }
  }, [colorMode, lightTheme, darkTheme]);

  return (
    <themeContext.Provider
      value={{ theme: activeTheme, colorMode, toggleTheme } as IThemeContext}
    >
      {children}
    </themeContext.Provider>
  );
};
