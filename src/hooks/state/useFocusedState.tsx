import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/style-functions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import { useDynamicStateStyle } from "./useDynamicStateStyle";

/**
 * Hook to manage a focused state and compose extra styling while a component is focused
 * @param props The props object of a component
 * @param styleFunctions List of style functions supported by the component. By default, boxStyleFunctions are used
 * @param activeComponentType Type of the component inside which the hook is used. By default, this value is set to 'basic'
 * @param animateable Whether the styles should be dynamically animated using Moti. By default, this value is set to 'true'
 * @param parentStateValue A override value to control the 'focused' state instead of the local state value
 * @returns The props object with updated styles according the current 'focused' state
 */
export const useFocusedState = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions,
  activeComponentType: ComponentTypes = "basic",
  animateable = true,
  parentStateValue: boolean | undefined = undefined
) => {
  const [focused, setFocused] = useState(false);

  // Override the focused state if the parentStateValue is provided
  let finalFocusedFlag;
  if (parentStateValue !== undefined) {
    finalFocusedFlag = parentStateValue;
  } else {
    finalFocusedFlag = focused;
  }

  const propsWithFocusedStyles = useDynamicStateStyle(
    props,
    "_focused",
    finalFocusedFlag,
    styleFunctions,
    activeComponentType,
    animateable
  );

  return {
    focused,
    setFocused,
    propsWithFocusedStyles,
  };
};
