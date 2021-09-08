import { createTheme } from "@shopify/restyle";

const palette = {
  primary100: "#E1E6FF",
  primary200: "#C3CCFF",
  primary300: "#A5B1FF",
  primary400: "#8F9DFF",
  primary500: "#6A7BFF",
  primary600: "#4D5BDB",
  primary700: "#3541B7",
  primary800: "#212A93",
  primary900: "#141B7A",

  secondary100: "#FFE1E7",
  secondary200: "#FFC3D6",
  secondary300: "#FFA5CB",
  secondary400: "#FF8FC9",
  secondary500: "#FF6AC6",
  secondary600: "#DB4DB3",
  secondary700: "#B7359F",
  secondary800: "#93218A",
  secondary900: "#78147A",

  neutral100: "#FFFFFF",
  neutral200: "#F7F9FC",
  neutral300: "#EDF1F7",
  neutral400: "#E4E9F2",
  neutral500: "#C5CEE0",
  neutral600: "#8F9BB3",
  neutral700: "#2E3A59",
  neutral800: "#222B45",
  neutral900: "#1A2138",

  success100: "#F5FCCC",
  success200: "#EAFA9A",
  success300: "#D6F266",
  success400: "#C0E640",
  success500: "#A2D608",
  success600: "#86B805",
  success700: "#6C9A04",
  success800: "#537C02",
  success900: "#426601",

  info100: "#D8FEFB",
  info200: "#B2FEFC",
  info300: "#8CF6FC",
  info400: "#6FE8FA",
  info500: "#40D2F7",
  info600: "#2EA6D4",
  info700: "#207EB1",
  info800: "#145B8F",
  info900: "#0C4176",

  warning100: "#FFF7D6",
  warning200: "#FFEDAE",
  warning300: "#FFE085",
  warning400: "#FFD367",
  warning500: "#FFBF35",
  warning600: "#DB9C26",
  warning700: "#B77B1A",
  warning800: "#935D10",
  warning900: "#7A480A",

  danger100: "#FFE7D9",
  danger200: "#FFCAB3",
  danger300: "#FFA68D",
  danger400: "#FF8371",
  danger500: "#FF4B42",
  danger600: "#DB3036",
  danger700: "#B72133",
  danger800: "#93152E",
  danger900: "#7A0C2C",
};

export const baseTheme = createTheme({
  colors: {
    ...palette,

    mainBackground: palette.neutral100,
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
      color: "textColor",
    },
    subheader: {
      fontFamily: "Jost-SemiBold",
      fontWeight: "600",
      fontSize: 24,
      color: "textColor",
    },
    title: {
      fontFamily: "Jost-Medium",
      fontWeight: "500",
      fontSize: 20,
      color: "textColor",
    },
    subtitle: {
      fontFamily: "Jost-Medium",
      fontWeight: "500",
      fontSize: 17,
      color: "textColor",
    },
    body1: {
      fontFamily: "Jost-Medium",
      fontWeight: "500",
      fontSize: 15,
      color: "textColor",
    },
    body2: {
      fontFamily: "Jost-Regular",
      fontWeight: "400",
      fontSize: 15,
      color: "textColor",
    },
    caption: {
      fontFamily: "Jost-Regular",
      fontWeight: "400",
      fontSize: 12,
      color: "textColor",
    },
    button: {
      fontFamily: "Jost-Medium",
      fontWeight: "500",
      fontSize: 16,
      color: "buttonTextColor",
    },
  },
  activityIndicatorSize: {
    s: {
      size: 10,
    },
    m: {
      size: 30,
    },
    l: {
      size: 50,
    },
    xl: {
      size: 70,
    },
  },
});

export type Theme = typeof baseTheme;

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    mainBackground: palette.neutral700,
    textColor: "#F0F2F3",
  },
};
