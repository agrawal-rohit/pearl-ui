import { baseTheme } from "./basetheme";
import { BasePearlTheme } from "./types";

// Enforces proper shape for theme without throwing away the user specific values
export const createTheme = <T extends BasePearlTheme>(themeObject: T): T =>
  themeObject;

export const extendTheme = (
  customTheme: Partial<BasePearlTheme>
): BasePearlTheme => {
  return {
    palette: { ...baseTheme.palette, ...customTheme.palette },
    spacing: { ...baseTheme.spacing, ...customTheme.spacing },
    components: { ...baseTheme.components, ...customTheme.components },
    elevation: { ...baseTheme.elevation, ...customTheme.elevation },
    zIndices: { ...baseTheme.zIndices, ...customTheme.zIndices },
    borderRadii: { ...baseTheme.borderRadii, ...customTheme.borderRadii },
  };
};
