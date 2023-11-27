import { useMemo } from "react";
import { StyleFunctionContainer } from "../theme/src/types";
import { useDimensions } from "./useDimensions";
import { useTheme } from "./useTheme";
import { composeCleanStyleProps, composeStyleProps } from "./utils/utils";

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

  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  // If props is falsy, return an empty object.
  if (!props) {
    return {};
  }

  // Compose clean style properties from props, buildStyleProperties, theme, and dimensions.
  return composeCleanStyleProps(props, buildStyleProperties, {
    theme,
    colorMode,
    dimensions,
  });
};
