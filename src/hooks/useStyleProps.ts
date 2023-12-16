import { useTheme } from "./useTheme";
import { StyleFunctionContainer } from "../theme/src/types";
import { buildFinalStyleProps, composeStyleProps } from "./utils/utils";
import { useMemo } from "react";
import _ from "lodash";
import { useWindowDimensions } from "react-native";

/**
 * Hook to convert the received style props to appropriate React Native styles
 * @param props Raw props passed to the component where the hook is being used.
 * @param styleFunctions List of style functions to use for computing the received style props.
 * @returns Object containing the computed style properties
 */
export const useStyleProps = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[]
) => {
  const { theme, colorMode } = useTheme();
  const dimensions = useWindowDimensions();

  // Compose the style functions
  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  // If no props are passed, return an empty style object
  if (_.isEmpty(props)) {
    return { style: {} };
  }

  // Build the final style properties
  return buildFinalStyleProps(props, buildStyleProperties, {
    theme,
    colorMode,
    dimensions,
  });
};
