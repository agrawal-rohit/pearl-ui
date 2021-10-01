import { getKeys } from "../theme/utils/typeHelpers";
import { useTheme } from "./useTheme";
import { checkKeyAvailability } from "./utils/utils";

const replaceColorValuesInObject = (
  newValue: string,
  obj: Record<string, any>
) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && value.includes("primary")) {
      obj[key] = value.replace("primary", newValue);
    }
  }
  return obj;
};

/**
 * Hook to get the covert an existing prop object to a different color scheme
 */
export const useColorScheme = (
  colorSchemeThemeKey: string,
  props: Record<string, any>
) => {
  const { theme } = useTheme();

  checkKeyAvailability(colorSchemeThemeKey, theme.palette, "theme.palette");

  getKeys(props).map((propKey) => {
    if (typeof props[propKey] === "object") {
      getKeys(props[propKey]).map((subPropKey) => {
        return replaceColorValuesInObject(colorSchemeThemeKey, props[propKey]);
      });
    }

    return replaceColorValuesInObject(colorSchemeThemeKey, props[propKey]);
  });
};
