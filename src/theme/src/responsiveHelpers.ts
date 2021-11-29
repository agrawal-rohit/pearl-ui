import { getKeys, isThemeKey } from "../utils/typeHelpers";
import {
  AtLeastOneResponsiveValue,
  BasePearlTheme,
  Breakpoint,
  Dimensions,
  PropValue,
  ResponsiveValue,
  StyleTransformFunction,
} from "./types";

export const getValueForScreenSize = ({
  responsiveValue,
  breakpoints,
  dimensions,
}: {
  responsiveValue: AtLeastOneResponsiveValue;
  breakpoints: BasePearlTheme["breakpoints"];
  dimensions: Dimensions;
}) => {
  const sortedBreakpoints = Object.entries(breakpoints).sort((valA, valB) => {
    const valAWidth = getWidth(valA[1]);
    const valBWidth = getWidth(valB[1]);

    return valAWidth - valBWidth;
  });

  const { width, height } = dimensions;
  return sortedBreakpoints.reduce<PropValue>((acc, [key, value]) => {
    if (typeof value === "object") {
      if (
        width >= value.width &&
        height >= value.height &&
        responsiveValue[key] !== undefined
      ) {
        return responsiveValue[key];
      }
    } else if (width >= value && responsiveValue[key] !== undefined) {
      return responsiveValue[key];
    }

    return acc;
  }, undefined);
};

export const isResponsiveObjectValue = (
  val: ResponsiveValue,
  theme: BasePearlTheme
): val is AtLeastOneResponsiveValue => {
  if (!val) return false;
  if (typeof val !== "object") return false;
  return getKeys(val).reduce((acc: boolean, key) => {
    return acc && theme.breakpoints[key as string] !== undefined;
  }, true);
};

function getWidth(value: Breakpoint) {
  if (typeof value === "object") {
    return value.width;
  }

  return value;
}
