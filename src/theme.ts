import { createTheme } from "@shopify/restyle";

const palette = {
  black: "#0B0B0B",
  white: "#F0F2F3",
};

const theme = createTheme({
  colors: {
    primary50: "#e5e8ff",
    primary100: "#e1e5ff",
    primary200: "#c3caff",
    primary300: "#a6b0ff",
    primary400: "#8895ff",
    primary500: "#6a7bff",
    primary600: "#5562cc",
    primary700: "#404a99",
    primary800: "#2a3166",
    primary900: "#151933",

    secondary50: "#fff0f9",
    secondary100: "#ffe1f4",
    secondary200: "#ffc3e8",
    secondary300: "#ffa6dd",
    secondary400: "#ff88d1",
    secondary500: "#ff6ac6",
    secondary600: "#cc559e",
    secondary700: "#994077",
    secondary800: "#662a4f",
    secondary900: "#331528",

    ...palette,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;
