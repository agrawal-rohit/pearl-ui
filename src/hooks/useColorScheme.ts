import { ColorScheme } from "../theme/src/types";
import { getKeys } from "../theme/utils/type-helpers";
import { useTheme } from "./useTheme";
import { checkKeyAvailability } from "./utils/utils";

/**
 * Recursively replaces color values in an object with a new value.
 * @param newValue The new value to replace the color values with.
 * @param obj The object to replace the color values in.
 * @returns The updated object with the new color values.
 */
const replaceColorValuesInObject = (
  newValue: string,
  obj: Record<string, any>
): Record<string, any> => {
  const updatedObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && !getKeys(obj).includes("$$typeof")) {
      updatedObj[key] = replaceColorValuesInObject(newValue, value);
    } else if (typeof value === "string" && value.includes("primary")) {
      updatedObj[key] = value.replace("primary", newValue);
    } else {
      updatedObj[key] = value;
    }
  }
  return updatedObj;
};

/**
 * Hook to convert an existing style props object to a different color scheme from the active theme palette.
 * @param targetColorScheme Name of the target color scheme.
 * @param props Style props object.
 * @returns The updated style props object with the new color scheme.
 */
export const useColorScheme = (
  targetColorScheme: ColorScheme,
  props: Record<string, any>
): Record<string, any> => {
  // If no target color scheme is provided, return the original props object.
  if (!targetColorScheme) return props;

  // Get the active theme from the useTheme hook.
  const { theme } = useTheme();

  // Check if the target color scheme is available in the theme palette.
  checkKeyAvailability(targetColorScheme, theme.palette, "theme.palette");

  // Replace the color values in the props object with the new target color scheme.
  return replaceColorValuesInObject(targetColorScheme, props);
};
