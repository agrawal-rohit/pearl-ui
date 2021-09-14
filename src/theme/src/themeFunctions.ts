import { IBasePearlTheme } from "./types";

// Enforces proper shape for theme without throwing away the user specific values
export const createTheme = <T extends IBasePearlTheme>(themeObject: T): T =>
  themeObject;
