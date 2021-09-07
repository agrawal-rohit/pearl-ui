import React, { useEffect, useState, useContext, createContext } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider as RestyleThemeProvider } from "@shopify/restyle";
import { baseTheme, darkTheme, Theme } from "./theme";
import { ReactElement } from "react-color/node_modules/@types/react";

type ThemeType = "light" | "dark" | "system";

interface IThemeContext {
  themeMode: ThemeType;
  toggleTheme(theme: string): void;
}

interface ThemeProviderProps {
  defaultMode?: ThemeType;
  light?: Theme;
  dark?: Theme;
}

export const themeContext = createContext({} as IThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultMode = "light",
  light = baseTheme,
  dark = darkTheme,
  children,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeType>(defaultMode);
  const systemThemeStyle = useColorScheme() as ThemeType;

  const toggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  };

  useEffect(() => {
    // Set theme
    if (defaultMode === "system") {
      setThemeMode(systemThemeStyle);
    }
  }, []);

  return (
    <themeContext.Provider value={{ themeMode, toggleTheme } as IThemeContext}>
      <RestyleThemeProvider theme={themeMode === "light" ? light : dark}>
        {children}
      </RestyleThemeProvider>
    </themeContext.Provider>
  );
};

export const useTheme = () => useContext(themeContext);
