import { createTheme } from "@shopify/restyle";

export const baseTheme = createTheme({
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

    mainBackground: "#F0F2F3",
    textColor: "#0B0B0B",
    buttonTextColor: "#F0F2F3",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
  textVariants: {
    header: {
      fontFamily: "Jost-Bold",
      fontWeight: "bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: "textColor",
    },
    subheader: {
      fontFamily: "Jost-SemiBold",
      fontWeight: "600",
      fontSize: 24,
      lineHeight: 36,
      color: "textColor",
    },
    title: {
      fontFamily: "Jost-Medium",
      fontWeight: "500",
      fontSize: 20,
      lineHeight: 34,
      color: "textColor",
    },
    subtitle: {
      fontFamily: "Jost-Medium",
      fontWeight: "500",
      fontSize: 17,
      lineHeight: 36,
      color: "textColor",
    },
    body1: {
      fontFamily: "Jost-Medium",
      fontWeight: "500",
      fontSize: 15,
      lineHeight: 36,
      color: "textColor",
    },
    body2: {
      fontFamily: "Jost-Regular",
      fontWeight: "400",
      fontSize: 15,
      lineHeight: 36,
      color: "textColor",
    },
    caption: {
      fontFamily: "Jost-Regular",
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 36,
      color: "textColor",
    },
    button: {
      fontFamily: "Jost-Medium",
      fontWeight: "500",
      fontSize: 16,
      lineHeight: 36,
      color: "buttonTextColor",
    },
  },
});

export type Theme = typeof baseTheme;

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    mainBackground: "#0B0B0B",
    textColor: "#F0F2F3",
  },
};
