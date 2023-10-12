import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/style-functions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import { useDynamicStateStyle } from "./useDynamicStateStyle";

/**
 * Hook to manage a disabled state and compose extra styling while a component is disabled
 * @param props The props object of a component
 * @param styleFunctions List of style functions supported by the component. By default, boxStyleFunctions are used
 * @param activeComponentType Type of the component inside which the hook is used. By default, this value is set to 'basic'
 * @param animateable Whether the styles should be dynamically animated using Moti. By default, this value is set to 'true'
 * @param parentStateValue A override value to control the 'disabled' state instead of the local state value
 * @returns The props object with updated styles according the current 'disabled' state
 */
export const useDisabledState = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions,
  activeComponentType: ComponentTypes = "basic",
  animateable = true,
  parentStateValue: boolean | undefined = undefined
) => {
  const [disabled, setDisabled] = useState(false);

  // Override the disabled state if the parentStateValue is provided
  let finalDisabledFlag;
  if (parentStateValue !== undefined) {
    finalDisabledFlag = parentStateValue;
  } else {
    finalDisabledFlag = disabled;
  }

  const propsWithDisabledStyles = useDynamicStateStyle(
    props,
    "_disabled",
    finalDisabledFlag,
    styleFunctions,
    activeComponentType,
    animateable
  );

  return {
    disabled,
    setDisabled,
    propsWithDisabledStyles,
  };
};
