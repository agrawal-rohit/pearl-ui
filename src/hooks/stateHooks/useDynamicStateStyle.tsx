import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/styleFunctions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import defaultRNStyles from "../../theme/utils/defaultRNStyles";
import { getKeys } from "../../theme/utils/typeHelpers";
import { useStateWithStyleProps } from "../useStateWithStyleProps";

/**
 * Hook to manage a pressed state and compose extra styling while a component is pressed
 */
export const useDynamicStateStyle = (
  props: Record<string, any>,
  stateKey: string,
  currentState: boolean,
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions,
  activeComponentType: ComponentTypes = "basic",
  animateable = true
) => {
  // Override the pressed state if the parentStateValue is provided
  let pressedStyles = props[stateKey];
  if (activeComponentType !== "molecule")
    pressedStyles = useStateWithStyleProps(props[stateKey], styleFunctions);

  let finalProps = props;
  if (animateable) {
    // Add missing required from the 'from' prop to the base style
    finalProps.animate = getKeys(pressedStyles).reduce((final, key: any) => {
      if (getKeys(defaultRNStyles).includes(key)) {
        return {
          [key]: (defaultRNStyles as any)[key],
          ...final,
        };
      }

      return final;
    }, finalProps.animate);

    if (currentState) {
      finalProps.animate = {
        ...finalProps.animate,
        ...pressedStyles,
      };
    }
  } else {
    if (currentState) {
      if (activeComponentType !== "molecule") {
        finalProps.style = {
          ...finalProps.style,
          ...pressedStyles,
        };
      } else {
        finalProps = {
          ...finalProps,
          ...pressedStyles,
        };
      }
    }
  }

  return finalProps;
};
