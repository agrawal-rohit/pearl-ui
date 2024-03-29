import React, { useEffect, useState, createContext } from "react";
import { useColorScheme } from "react-native";
import { baseTheme } from "./base/index";
import { FinalPearlTheme } from "./types";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type ColorMode = "light" | "dark";

export interface IThemeContext {
  /** Theme configuration object for the active color mode */
  theme: FinalPearlTheme;
  /** Active color mode */
  colorMode: ColorMode;
  /** Function to toggle the active color mode */
  toggleColorMode(): void;
  /** Function to switch the active color mode to a specific mode */
  switchColorMode(colorMode: ColorMode | "system"): void;
}

interface ThemeProviderProps {
  /**
   * Initial color mode for the theme (light, dark, system)
   *
   * @default "light"
   */
  initialColorMode?: ColorMode | "system";
  /** The theme configuration object */
  theme?: FinalPearlTheme;
  /**
   * A flag that describes the loading status of the custom fonts.
   *
   * @default true
   */
  haveFontsLoaded?: boolean;
  /**React children */
  children?: React.ReactNode;
}

export const themeContext = createContext({} as IThemeContext);

/**
 * The main provider component which controls the theme and color mode of the components in the entire application.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialColorMode = "light",
  theme = baseTheme,
  haveFontsLoaded = true,
  children,
}) => {
  const systemThemeStyle = useColorScheme() as ColorMode;
  const [colorMode, setColorMode] = useState<ColorMode>(
    initialColorMode === "system" ? systemThemeStyle : initialColorMode
  );

  const switchColorMode = (colorMode: ColorMode | "system") => {
    if (colorMode === "dark") {
      setColorMode("dark");
    } else if (colorMode == "light") {
      setColorMode("light");
    } else {
      setColorMode(systemThemeStyle);
    }
  };

  const toggleColorMode = () => {
    if (colorMode === "light") {
      switchColorMode("dark");
    } else {
      switchColorMode("light");
    }
  };

  useEffect(() => {
    let activeTheme =
      initialColorMode === "system" ? systemThemeStyle : initialColorMode;
    switchColorMode(activeTheme);
  }, [theme, initialColorMode, systemThemeStyle]);

  if (haveFontsLoaded) {
    return (
      <themeContext.Provider
        value={
          {
            theme,
            colorMode,
            toggleColorMode,
            switchColorMode,
          } as IThemeContext
        }
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          {children}
        </GestureHandlerRootView>
      </themeContext.Provider>
    );
  }

  return null;
};
