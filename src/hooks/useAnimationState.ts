import { useAnimationState as useMotiAnimationState } from "moti";
import { StyleFunctionContainer, boxStyleFunctions } from "../theme";
import { MotiWithPearlStyleProps } from "../theme/src/types";
import { ViewStyle } from "react-native";
import { BoxStyleProps } from "../theme/src/style-functions";
import { useMotiWithStyleProps } from "./useMotiWithStyleProps";
import { useMemo } from "react";

/**
 * This function is a custom hook that creates an animation state using the provided props and style functions.
 *
 * @param props - The animation state props. These are the properties that define the animation state.
 * @param styleFunctions - The style functions to use. These functions are used to convert the provided props into a format that can be used to create an animation state. If no style functions are provided, all style functions are used by default.
 *
 * @returns An animation state created using the provided props and style functions.
 */
export const useAnimationState = (
  props: MotiWithPearlStyleProps<ViewStyle, BoxStyleProps> & {
    to?: MotiWithPearlStyleProps<ViewStyle, BoxStyleProps>["from"];
  },
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions
) => {
  // Use the useMemo hook to memoize the converted props. This will prevent unnecessary computations if the props and style functions have not changed.
  const convertedProps = useMemo(
    () => useMotiWithStyleProps(props, styleFunctions),
    [props, styleFunctions]
  );

  // Use the useMemo hook to memoize the animation state. This will prevent unnecessary computations if the converted props have not changed.
  const animationState = useMemo(
    () => useMotiAnimationState(convertedProps),
    [convertedProps]
  );

  // Return the memoized animation state.
  return animationState;
};
