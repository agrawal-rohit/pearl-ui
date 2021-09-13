import React, { useEffect, useState, useContext, createContext } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider as RestyleThemeProvider } from "@shopify/restyle";
import { baseLightTheme, baseDarkTheme } from "./theme";
import { IBasePearlTheme } from "./types";

type ThemeType = "light" | "dark" | "system";

export interface IThemeContext {
  /** Theme configuration object for the active color mode */
  theme: IBasePearlTheme;
  /** Active color mode */
  colorMode: ThemeType;
  /** Function to toggle the active color mode and corresponding theme */
  toggleTheme(): void;
}

interface ThemeProviderProps {
  /** Initial color mode for the theme (light, dark, system) */
  initialColorMode?: ThemeType;
  /** The configuration object for light theme */
  lightTheme?: IBasePearlTheme;
  /** The configuration object for dark theme */
  darkTheme?: IBasePearlTheme;
}

export const themeContext = createContext({} as IThemeContext);

/**
 * The main provider component which controls the theme and color mode of the components in the entire application.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialColorMode = "light",
  lightTheme = baseLightTheme,
  darkTheme = baseDarkTheme,
  children,
}) => {
  const [colorMode, setColorMode] = useState<ThemeType>(initialColorMode);
  const [activeTheme, setActiveTheme] = useState<IBasePearlTheme>(lightTheme);
  const systemThemeStyle = useColorScheme() as ThemeType;

  const toggleTheme = () => {
    if (colorMode === "light") {
      setColorMode("dark");
      setActiveTheme(darkTheme);
    } else {
      setColorMode("light");
      setActiveTheme(lightTheme);
    }
  };

  useEffect(() => {
    // Set initial Theme

    if (colorMode === "light") {
      setColorMode("light");
      setActiveTheme(lightTheme);
    } else if (colorMode === "dark") {
      setColorMode("dark");
      setActiveTheme(darkTheme);
    } else if (colorMode === "system") {
      setColorMode(systemThemeStyle);
      setActiveTheme(systemThemeStyle === "light" ? lightTheme : darkTheme);
    }
  }, []);

  return (
    <themeContext.Provider
      value={{ theme: activeTheme, colorMode, toggleTheme } as IThemeContext}
    >
      <RestyleThemeProvider theme={activeTheme}>
        {children}
      </RestyleThemeProvider>
    </themeContext.Provider>
  );
};
