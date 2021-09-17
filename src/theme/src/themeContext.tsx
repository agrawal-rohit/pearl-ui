import React, { useEffect, useState, createContext } from "react";
import { useColorScheme } from "react-native";
import { baseTheme } from "./basetheme";
import { BasePearlTheme } from "./types";

type ThemeType = "light" | "dark" | "system";

export interface IThemeContext {
  /** Theme configuration object for the active color mode */
  theme: BasePearlTheme;
  /** Active color mode */
  colorMode: ThemeType;
  /** Function to toggle the active color mode */
  toggleColorMode(): void;
}

interface ThemeProviderProps {
  /** Initial color mode for the theme (light, dark, system) */
  initialColorMode?: ThemeType;
  /** The configuration object for light theme */
  theme?: BasePearlTheme;
  /**React children */
  children: React.ReactNode;
}

export const themeContext = createContext({} as IThemeContext);

/**
 * The main provider component which controls the theme and color mode of the components in the entire application.
 */
export const ThemeProvider = ({
  initialColorMode = "light",
  theme = baseTheme,
  children,
}: ThemeProviderProps) => {
  const [colorMode, setColorMode] = useState<ThemeType>(initialColorMode);
  const systemThemeStyle = useColorScheme() as ThemeType;

  const changeThemeTo = (colorMode: ThemeType) => {
    if (colorMode === "dark") {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  };

  const toggleColorMode = () => {
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
  }, [colorMode, theme]);

  return (
    <themeContext.Provider
      value={{ theme, colorMode, toggleColorMode } as IThemeContext}
    >
      {children}
    </themeContext.Provider>
  );
};
