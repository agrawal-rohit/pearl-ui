import namedColors from "../../utils/namedColors.json";
import { ColorPalette } from "../types";

export const palette = {
  primary: {
    50: "#F0F2FF",
    100: "#E1E6FF",
    200: "#C3CCFF",
    300: "#A5B1FF",
    400: "#8F9DFF",
    500: "#6A7BFF",
    600: "#4D5BDB",
    700: "#3541B7",
    800: "#212A93",
    900: "#141B7A",
  },

  secondary: {
    50: "#FFF1F4",
    100: "#FFE1E7",
    200: "#FFC3D6",
    300: "#FFA5CB",
    400: "#FF8FC9",
    500: "#FF6AC6",
    600: "#DB4DB3",
    700: "#B7359F",
    800: "#93218A",
    900: "#78147A",
  },

  neutral: {
    50: "#FFFFFF",
    100: "#F7F9FC",
    200: "#EDF1F7",
    300: "#E4E9F2",
    400: "#C5CEE0",
    500: "#8F9BB3",
    600: "#58617A",
    700: "#2E3A59",
    800: "#222B45",
    900: "#1A2138",
  },

  success: {
    50: "#F6FBE6",
    100: "#F5FCCC",
    200: "#EAFA9A",
    300: "#D6F266",
    400: "#C0E640",
    500: "#A2D608",
    600: "#86B805",
    700: "#6C9A04",
    800: "#537C02",
    900: "#426601",
  },

  info: {
    50: "#ECFBFE",
    100: "#D8FEFB",
    200: "#B2FEFC",
    300: "#8CF6FC",
    400: "#6FE8FA",
    500: "#40D2F7",
    600: "#2EA6D4",
    700: "#207EB1",
    800: "#145B8F",
    900: "#0C4176",
  },

  warning: {
    50: "#FFF9EB",
    100: "#FFF7D6",
    200: "#FFEDAE",
    300: "#FFE085",
    400: "#FFD367",
    500: "#FFBF35",
    600: "#DB9C26",
    700: "#B77B1A",
    800: "#935D10",
    900: "#7A480A",
  },

  danger: {
    50: "#FFEDEC",
    100: "#FFE7D9",
    200: "#FFCAB3",
    300: "#FFA68D",
    400: "#FF8371",
    500: "#FF4B42",
    600: "#DB3036",
    700: "#B72133",
    800: "#93152E",
    900: "#7A0C2C",
  },

  ...namedColors,
} as Record<string, string | ColorPalette>;
