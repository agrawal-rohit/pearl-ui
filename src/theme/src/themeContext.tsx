import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
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
  /** The theme configuration object */
  theme?: BasePearlTheme;
  /** A mapping object of the fonts used by the theme */
  fonts?: object;
  /**React children */
  children: React.ReactNode;
}

const baseFonts = {
  "Poppins-Light": Poppins_300Light,
  "Poppins-Regular": Poppins_400Regular,
  "Poppins-Medium": Poppins_500Medium,
  "Poppins-SemiBold": Poppins_600SemiBold,
  "Poppins-Bold": Poppins_700Bold,
  "Poppins-ExtraBold": Poppins_800ExtraBold,
};

export const themeContext = createContext({} as IThemeContext);

/**
 * The main provider component which controls the theme and color mode of the components in the entire application.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialColorMode = "light",
  theme = baseTheme,
  fonts = baseFonts,
  children,
}) => {
  const [colorMode, setColorMode] = useState<ThemeType>(initialColorMode);
  const systemThemeStyle = useColorScheme() as ThemeType;
  const [haveFontsLoaded] = useFonts(fonts);

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
  }, [colorMode, initialColorMode, theme]);

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
