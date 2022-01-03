import { ExpandedColors } from "./../theme/src/types";
import { color } from "./../theme/src/styleFunctions";
import { useStyledProps } from "./useStyledProps";
import { TinyColor } from "@ctrl/tinycolor";

/**
 * Hook to get the most accessible foreground color value based on a provided background color
 * @param backgroundColor The color value of the background color
 * @param foregroundChoices The foreground color values to choose from. It expects an object which a 'light' key (for the lighter color) and a 'dark' key (for the darker color)
 * @returns
 */
export const useAccessibleColor = (
  backgroundColor: ExpandedColors,
  foregroundChoices: { light: ExpandedColors; dark: ExpandedColors } = {
    light: "white",
    dark: "black",
  }
) => {
  const backgroundColorConverted = useStyledProps({ color: backgroundColor }, [
    color,
  ]);

  const isColorLight = new TinyColor(
    backgroundColorConverted.style.color
  ).isLight();
  if (isColorLight) {
    return foregroundChoices.dark;
  }

  return foregroundChoices.light;
};
