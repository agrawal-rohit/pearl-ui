import { useTheme } from "./useTheme";
import { useDimensions } from "./useDimensions";
import { PropValue, ResponsiveValue } from "../theme/src/types";
import {
  getValueForScreenSize,
  isResponsiveObjectValue,
} from "../theme/src/responsive-helpers";

/**
 * Hook to get the appropriate value from a responsive style object based on the current screen size.
 * @param propValue An object that specifies the values based on the different breakpoints
 * @returns
 */
export const useResponsiveProp = (propValue: ResponsiveValue<PropValue>) => {
  const { theme } = useTheme();
  const dimensions = useDimensions();

  return isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue;
};
