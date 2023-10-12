import { boxStyleFunctions } from "../../theme/src/style-functions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import defaultRNStyles from "../../theme/utils/default-rn-styles";
import { getKeys } from "../../theme/utils/type-helpers";
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
  let stateStyles = props[stateKey];

  if (!stateStyles) return props;

  if (activeComponentType !== "molecule")
    stateStyles = useStateWithStyleProps(stateStyles, styleFunctions);

  let finalProps = props;
  if (animateable) {
    // Add missing required from the 'from' prop to the base style
    finalProps.animate = getKeys(stateStyles).reduce((final, key: any) => {
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
        ...stateStyles,
      };
    }
  } else {
    if (currentState) {
      if (activeComponentType !== "molecule") {
        finalProps.style = {
          ...finalProps.style,
          ...stateStyles,
        };
      } else {
        finalProps = {
          ...finalProps,
          ...stateStyles,
        };
      }
    }
  }

  return finalProps;
};
