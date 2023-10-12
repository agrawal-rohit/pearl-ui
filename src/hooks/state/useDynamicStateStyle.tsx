import { boxStyleFunctions } from "../../theme/src/style-functions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import defaultRNStyles from "../../theme/utils/default-rn-styles";
import { getKeys } from "../../theme/utils/type-helpers";
import { useStateWithStyleProps } from "../useStateWithStyleProps";

/**
 * Hook to manage a pressed state and compose extra styling while a component is pressed
 *
 * @param props - The props of the component
 * @param stateKey - The key of the state to manage
 * @param currentState - The current state of the component
 * @param styleFunctions - The style functions to use
 * @param activeComponentType - The active component type
 * @param animateable - Whether the component is animateable
 * @returns The final props of the component
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

  // If there are no state styles, return the original props
  if (!stateStyles) return props;

  // If the component type is not "molecule", use the useStateWithStyleProps hook
  if (activeComponentType !== "molecule")
    stateStyles = useStateWithStyleProps(stateStyles, styleFunctions);

  let finalProps = props;

  // If the component is animateable, add missing required styles from the 'from' prop to the base style
  if (animateable) {
    finalProps.animate = getKeys(stateStyles).reduce((final, key: any) => {
      if (getKeys(defaultRNStyles).includes(key)) {
        return {
          [key]: (defaultRNStyles as any)[key],
          ...final,
        };
      }

      return final;
    }, finalProps.animate);

    // If the current state is true, add the state styles to the animate prop
    if (currentState) {
      finalProps.animate = {
        ...finalProps.animate,
        ...stateStyles,
      };
    }
  } else {
    // If the component is not animateable and the current state is true, add the state styles to the style prop
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
