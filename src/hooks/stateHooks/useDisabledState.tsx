import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/styleFunctions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import { useDynamicStateStyle } from "./useDynamicStateStyle";

/**
 * Hook to manage a disabled state and compose extra styling while a component is disabled
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
