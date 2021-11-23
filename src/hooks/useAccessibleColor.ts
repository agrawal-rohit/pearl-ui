import { ColorInput, TinyColor } from "@ctrl/tinycolor";

/**
 * Hook to get the appropriate foreground color value based on a provided color
 * @param backgroundColor The color value of the background color
 * @param foregroundChoices The foreground color values to choose from. It expects an object which a 'light' key (for the lighter color) and a 'dark' key (for the darker color)
 * @returns
 */
export const useAccessibleColor = (
  backgroundColor: ColorInput,
  foregroundChoices: { light: ColorInput; dark: ColorInput } = {
    light: "white",
    dark: "black",
  }
) => {
  const isColorLight = new TinyColor(backgroundColor).isLight();
  if (isColorLight) {
    return foregroundChoices.dark;
  }

  return foregroundChoices.light;
};
