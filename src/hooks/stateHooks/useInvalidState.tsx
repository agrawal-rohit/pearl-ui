import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/styleFunctions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import { useDynamicStateStyle } from "./useDynamicStateStyle";

/**
 * Hook to manage a focused state and compose extra styling while a component is invalid
 * @param props The props object of a component
 * @param styleFunctions List of style functions supported by the component. By default, boxStyleFunctions are used
 * @param activeComponentType Type of the component inside which the hook is used. By default, this value is set to 'basic'
 * @param animateable Whether the styles should be dynamically animated using Moti. By default, this value is set to 'true'
 * @param parentStateValue A override value to control the 'invalid' state instead of the local state value
 * @returns The props object with updated styles according the current 'invalid' state
 */
export const useInvalidState = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions,
  activeComponentType: ComponentTypes = "basic",
  animateable = true,
  parentStateValue: boolean | undefined = undefined
) => {
  const [invalid, setInvalid] = useState(false);

  // Override the focused state if the parentStateValue is provided
  let finalInvalidFlag;
  if (parentStateValue !== undefined) {
    finalInvalidFlag = parentStateValue;
  } else {
    finalInvalidFlag = invalid;
  }

  const propsWithInvalidStyles = useDynamicStateStyle(
    props,
    "_invalid",
    finalInvalidFlag,
    styleFunctions,
    activeComponentType,
    animateable
  );

  return {
    invalid,
    setInvalid,
    propsWithInvalidStyles,
  };
};
