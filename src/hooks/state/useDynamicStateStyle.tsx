import _ from "lodash";
import {
  allStyleFunctions,
  boxStyleFunctions,
} from "../../theme/src/style-functions";
import { ComponentTypes, StyleFunctionContainer } from "../../theme/src/types";
import { removeUndefined } from "../../theme/utils/utils";
import { useStateWithStyleProps } from "../useStateWithStyleProps";
import { NON_ANIMATEABLE_STYLE_PROPS } from "../utils/utils";

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
  let stateStyles = useStateWithStyleProps(props[stateKey], styleFunctions);

  delete props[stateKey];

  // If there are no state styles, return the original props
  if (!stateStyles) return props;

  const animateableStyles = _.omit(stateStyles, NON_ANIMATEABLE_STYLE_PROPS);
  const allStylePropertyKeys = allStyleFunctions.map((val) => val.property);
  const animateableStyleProperties = Object.values(
    _.omit(allStylePropertyKeys, NON_ANIMATEABLE_STYLE_PROPS)
  ) as string[];

  let finalProps = props;

  // If the component is animateable, add missing required styles from the 'from' prop to the base style
  if (animateable) {
    // If the current state is true, add the state styles to the animate prop
    if (currentState) {
      finalProps.animate = {
        ...finalProps.animate,
        ...removeUndefined(animateableStyles),
      };
    }

    if (!finalProps.animate) finalProps.animate = undefined;
  } else {
    // If the component is not animateable and the current state is true, add the state styles to the style prop
    if (currentState) {
      if (activeComponentType !== "molecule") {
        finalProps.style = {
          ...finalProps.style,
          ...removeUndefined(stateStyles),
        };
      } else {
        finalProps = {
          ...finalProps,
          ...removeUndefined(stateStyles),
        };
      }
    }
  }

  return finalProps;
};
