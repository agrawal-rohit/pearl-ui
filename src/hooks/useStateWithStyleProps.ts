import _ from "lodash";
import { StyleFunctionContainer } from "../theme/src/types";
import { useDimensions } from "./useDimensions";
import { useTheme } from "./useTheme";
import { composeCleanStyleProps, composeStyleProps } from "./utils/utils";
import { useMemo } from "react";

/**
 * Returns a state object with style properties.
 * @param props - The props to extract style properties from.
 * @param styleFunctions - An array of style functions to apply to the props.
 * @returns A state object with style properties.
 */
export const useStateWithStyleProps = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[]
) => {
  const { theme, colorMode } = useTheme();
  const dimensions = useDimensions();

  // If props is falsy, return an empty object.
  if (_.isEmpty(props)) {
    return {};
  }

  // Compose the style functions
  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  // Compose clean style properties from props, buildStyleProperties, theme, and dimensions.
  // Use memoization to avoid unnecessary computations.
  return useMemo(
    () =>
      composeCleanStyleProps(props, buildStyleProperties, {
        theme,
        colorMode,
        dimensions,
      }),
    [props, buildStyleProperties, theme, colorMode, dimensions]
  );
};
