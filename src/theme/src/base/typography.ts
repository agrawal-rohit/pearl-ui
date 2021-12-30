import { FontConfig } from "../types";

export const fonts = {
  body: "Poppins",
  heading: "Poppins",
  mono: "Poppins",
} as Record<string, string>;

export const fontConfig: FontConfig = {
  Poppins: {
    "100": {
      normal: "Poppins-Hairline",
      italic: "Poppins-HairlineItalic",
    },
    "200": {
      normal: "Poppins-Thin",
      italic: "Poppins-ThinItalic",
    },
    "300": {
      normal: "Poppins-Light",
      italic: "Poppins-LightItalic",
    },
    "400": {
      normal: "Poppins-Regular",
      italic: "Poppins-RegularItalic",
    },
    "500": {
      normal: "Poppins-Medium",
      italic: "Poppins-MediumItalic",
    },
    "600": {
      normal: "Poppins-SemiBold",
      italic: "Poppins-SemiBoldItalic",
    },
    "700": {
      normal: "Poppins-Bold",
      italic: "Poppins-BoldItalic",
    },
    "800": {
      normal: "Poppins-ExtraBold",
      italic: "Poppins-ExtraBoldItalic",
    },
    "900": {
      normal: "Poppins-Black",
      italic: "Poppins-BlackItalic",
    },
  },
} as FontConfig;

export const fontSizes = {
  "2xs": 10,
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
  "2xl": 22,
  "3xl": 24,
  "4xl": 26,
  "5xl": 28,
  "6xl": 30,
  "7xl": 32,
  "8xl": 34,
  "9xl": 36,
  "10xl": 38,
  "11xl": 40,
  "12xl": 42,
} as Record<string, number>;

export const lineHeights = {
  "2xs": 14,
  xs: 16,
  s: 18,
  m: 20,
  l: 22,
  xl: 24,
  "2xl": 26,
  "3xl": 28,
  "4xl": 30,
  "5xl": 32,
  "6xl": 34,
  "7xl": 36,
  "8xl": 38,
  "9xl": 40,
  "10xl": 42,
  "11xl": 44,
  "12xl": 46,
} as Record<string, number>;

export const fontWeights = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as Record<string, string>;
