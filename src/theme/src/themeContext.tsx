import AppLoading from "expo-app-loading";
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
  /** Default color mode for the theme (light, dark, system) */
  defaultColorMode?: ThemeType;
  /** The theme configuration object */
  theme?: BasePearlTheme;
  /** A flag that describes the loading status of the custom fonts */
  haveFontsLoaded?: boolean;
  /**React children */
  children: React.ReactNode;
}

export const themeContext = createContext({} as IThemeContext);

/**
 * The main provider component which controls the theme and color mode of the components in the entire application.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultColorMode = "light",
  theme = baseTheme,
  haveFontsLoaded = true,
  children,
}) => {
  const [colorMode, setColorMode] = useState<ThemeType>(defaultColorMode);
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
  }, [colorMode, defaultColorMode, theme]);

  if (haveFontsLoaded) {
    return (
      <themeContext.Provider
        value={{ theme, colorMode, toggleColorMode } as IThemeContext}
      >
        {children}
      </themeContext.Provider>
    );
  }

  return <AppLoading />;
};
