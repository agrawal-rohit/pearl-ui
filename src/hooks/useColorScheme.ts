import { ColorScheme } from "../theme/src/types";
import { getKeys } from "../theme/utils/type-helpers";
import { useTheme } from "./useTheme";
import { checkKeyAvailability } from "./utils/utils";

const replaceColorValuesInObject = (
  newValue: string,
  obj: Record<string, any>
) => {
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
 * Hook to covert an existing style props object to a different color scheme from the active theme palette.
 * @param targetColorScheme  Name of the target color scheme
 * @param props Style props object
 * @returns
 */
export const useColorScheme = (
  targetColorScheme: ColorScheme,
  props: Record<string, any>
): Record<string, any> => {
  if (!targetColorScheme) return props;

  const { theme } = useTheme();

  checkKeyAvailability(targetColorScheme, theme.palette, "theme.palette");

  return replaceColorValuesInObject(targetColorScheme, props);
};
