import { useAnimationState as useMotiAnimationState } from "moti";
import { StyleFunctionContainer, boxStyleFunctions } from "../theme";
import { useMotiWithStyleProps } from "../hooks";
import { MotiWithPearlStyleProps } from "../theme/src/types";
import { ViewStyle } from "react-native";
import { BoxStyleProps } from "../theme/src/style-functions";

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
  // Convert the provided props using the specified style functions. This step is necessary because the props provided may not be in a format that can be used to create an animation state directly.
  const convertedProps = useMotiWithStyleProps(props, styleFunctions);

  // Use the converted props to create an animation state. The useAnimationState function from the "moti" library is used to create the animation state.
  return useMotiAnimationState(convertedProps);
};
