import { getKeys } from "../theme/utils/typeHelpers";
import { useTheme } from "./useTheme";
import { checkKeyAvailability } from "./utils/utils";

const replaceColorValuesInObject = (
  newValue: string,
  obj: Record<string, any>
) => {
  const updatedObj: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
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
 * Hook to get the covert an existing prop object to a different color scheme
 */
export const useColorScheme = (
  colorSchemeThemeKey: string,
  props: Record<string, any>
): Record<string, any> => {
  const { theme } = useTheme();

  checkKeyAvailability(colorSchemeThemeKey, theme.palette, "theme.palette");

  return replaceColorValuesInObject(colorSchemeThemeKey, props);
};
