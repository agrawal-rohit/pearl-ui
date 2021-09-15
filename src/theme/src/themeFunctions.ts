import { BasePearlTheme } from "./types";

// Enforces proper shape for theme without throwing away the user specific values
export const createTheme = <T extends BasePearlTheme>(themeObject: T): T =>
  themeObject;
