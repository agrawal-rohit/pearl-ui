import { useTheme } from "./useTheme";
import {
  AtLeastOneResponsiveValue,
  PropValue,
  ResponsiveValue,
} from "../theme/src/types";
import {
  getValueForScreenSize,
  isResponsiveObjectValue,
} from "../theme/src/responsive-helpers";
import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

/**
 * Hook to get the appropriate value from a responsive style object based on the current screen size.
 * @param propValue An object that specifies the values based on the different breakpoints
 * @returns The appropriate value from the responsive style object based on the current screen size
 */
export const useResponsiveProp = <T extends PropValue = PropValue>(
  propValue: ResponsiveValue<T>
): T => {
  const { theme } = useTheme();
  const dimensions = useWindowDimensions();

  // If the propValue is a responsive object value, get the appropriate value for the current screen size
  // Use useMemo to avoid unnecessary calculations on every render
  return useMemo(() => {
    if (isResponsiveObjectValue(propValue, theme)) {
      const valueForScreenSize = getValueForScreenSize({
        responsiveValue: propValue as AtLeastOneResponsiveValue<T>,
        breakpoints: theme.breakpoints,
        dimensions,
      });
      return valueForScreenSize as T;
    }

    // If the propValue is not a responsive object value, return the propValue as is
    return propValue as T;
  }, [propValue, theme, dimensions]);
};
