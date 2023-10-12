import { getKeys } from "../utils/type-helpers";
import {
  AtLeastOneResponsiveValue,
  FinalPearlTheme,
  Breakpoint,
  Dimensions,
  PropValue,
  ResponsiveValue,
} from "./types";

/**
 * Returns the value of a responsive object for the current screen size.
 * @param responsiveValue - The responsive object to get the value from.
 * @param breakpoints - The breakpoints object from the theme.
 * @param dimensions - The dimensions object containing the current screen width and height.
 * @returns The value of the responsive object for the current screen size.
 */
export const getValueForScreenSize = ({
  responsiveValue,
  breakpoints,
  dimensions,
}: {
  responsiveValue: AtLeastOneResponsiveValue;
  breakpoints: FinalPearlTheme["breakpoints"];
  dimensions: Dimensions;
}) => {
  // Sort breakpoints by width
  const sortedBreakpoints = Object.entries(breakpoints).sort((valA, valB) => {
    const valAWidth = getWidth(valA[1]);
    const valBWidth = getWidth(valB[1]);

    return valAWidth - valBWidth;
  });

  const { width, height } = dimensions;

  // Find the value for the current screen size
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

/**
 * Determines whether a value is a responsive object value.
 * @param val - The value to check.
 * @param theme - The theme object.
 * @returns Whether the value is a responsive object value.
 */
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

/**
 * Gets the width of a breakpoint.
 * @param value - The breakpoint to get the width of.
 * @returns The width of the breakpoint.
 */
function getWidth(value: Breakpoint) {
  if (typeof value === "object") {
    return value.width;
  }

  return value;
}
