import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/styleFunctions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import { useDynamicStateStyle } from "./useDynamicStateStyle";

/**
 * Hook to manage a pressed state and compose extra styling while a component is pressed
 */
export const usePressedState = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions,
  activeComponentType: ComponentTypes = "basic",
  animateable = true,
  parentStateValue = undefined
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
