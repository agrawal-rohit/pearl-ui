import { breakpoints } from "./base/breakpoints";
import { getKeys, isThemeKey } from "../utils/typeHelpers";
import {
  AtLeastOneResponsiveValue,
  FinalPearlTheme,
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
  breakpoints: FinalPearlTheme["breakpoints"];
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
        responsiveValue[key as keyof FinalPearlTheme["breakpoints"]] !==
          undefined
      ) {
        return responsiveValue[key as keyof FinalPearlTheme["breakpoints"]];
      }
    } else if (
      width >= value &&
      responsiveValue[key as keyof FinalPearlTheme["breakpoints"]] !== undefined
    ) {
      return responsiveValue[key as keyof FinalPearlTheme["breakpoints"]];
    }

    return acc;
  }, undefined);
};

export const isResponsiveObjectValue = (
  val: ResponsiveValue<PropValue>,
  theme: FinalPearlTheme
): val is AtLeastOneResponsiveValue => {
  if (!val) return false;
  if (typeof val !== "object") return false;
  return getKeys(val).reduce(
    (acc: boolean, key: keyof FinalPearlTheme["breakpoints"]) => {
      return acc && theme.breakpoints[key] !== undefined;
    },
    true
  );
};

function getWidth(value: Breakpoint) {
  if (typeof value === "object") {
    return value.width;
  }

  return value;
}
