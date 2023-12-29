import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/style-functions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import { useDynamicStateStyle } from "./useDynamicStateStyle";

/**
 * Hook to manage a hovered state and compose extra styling while a component is hovered
 * @param props The props object of a component
 * @param styleFunctions List of style functions supported by the component. By default, boxStyleFunctions are used
 * @param activeComponentType Type of the component inside which the hook is used. By default, this value is set to 'basic'
 * @param animateable Whether the styles should be dynamically animated using Moti. By default, this value is set to 'true'
 * @param parentStateValue A override value to control the 'hovered' state instead of the local state value
 * @returns The props object with updated styles according the current 'hovered' state
 */
export const useHoveredState = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions,
  activeComponentType: ComponentTypes = "basic",
  animateable = true,
  parentStateValue: boolean | undefined = undefined
) => {
  // Initialize hovered state to false
  const [hovered, setHovered] = useState(false);

  // Override the hovered state if the parentStateValue is provided
  let finalHoveredFlag;
  if (parentStateValue !== undefined) {
    finalHoveredFlag = parentStateValue;
  } else {
    finalHoveredFlag = hovered;
  }

  // Compose extra styling while a component is hovered
  const propsWithHoveredStyles = useDynamicStateStyle(
    props,
    "_hovered",
    finalHoveredFlag,
    styleFunctions,
    activeComponentType,
    animateable
  );

  return {
    hovered,
    setHovered,
    propsWithHoveredStyles,
  };
};
