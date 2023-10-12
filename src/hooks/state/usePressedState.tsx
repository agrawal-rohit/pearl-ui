import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/style-functions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import { useDynamicStateStyle } from "./useDynamicStateStyle";

/**
 * Hook to manage a pressed state and compose extra styling while a component is pressed
 * @param props The props object of a component
 * @param styleFunctions List of style functions supported by the component. By default, boxStyleFunctions are used
 * @param activeComponentType Type of the component inside which the hook is used. By default, this value is set to 'basic'
 * @param animateable Whether the styles should be dynamically animated using Moti. By default, this value is set to 'true'
 * @param parentStateValue A override value to control the 'pressed' state instead of the local state value
 * @returns The props object with updated styles according the current 'pressed' state
 */
export const usePressedState = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions,
  activeComponentType: ComponentTypes = "basic",
  animateable = true,
  parentStateValue: boolean | undefined = undefined
) => {
  const [pressed, setPressed] = useState(false);

  // Override the pressed state if the parentStateValue is provided
  let finalPressedFlag;
  if (parentStateValue !== undefined) {
    finalPressedFlag = parentStateValue;
  } else {
    finalPressedFlag = pressed;
  }

  const propsWithPressedStyles = useDynamicStateStyle(
    props,
    "_pressed",
    finalPressedFlag,
    styleFunctions,
    activeComponentType,
    animateable
  );

  return {
    pressed,
    setPressed,
    propsWithPressedStyles,
  };
};
