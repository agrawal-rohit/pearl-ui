import { useTheme } from "./useTheme";
import { useDimensions } from "./useDimensions";
import { PropValue, ResponsiveValue } from "../theme/src/types";
import {
  getValueForScreenSize,
  isResponsiveObjectValue,
} from "../theme/src/responsiveHelpers";

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
