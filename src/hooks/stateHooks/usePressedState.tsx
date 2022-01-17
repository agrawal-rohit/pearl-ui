import { useState } from "react";
import { boxStyleFunctions } from "../../theme/src/styleFunctions";
import { StyleFunctionContainer } from "../../theme/src/types";
import defaultRNStyles from "../../theme/utils/defaultRNStyles";
import { getKeys } from "../../theme/utils/typeHelpers";
import { useStateWithStyleProps } from "../useStateWithStyleProps";

/**
 * Hook to manage a pressed state and compose extra styling while a component is pressed
 */
export const usePressedState = (
  props: Record<string, any>,
  parentStateValue: boolean = false,
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions
) => {
  const [pressed, setPressed] = useState(parentStateValue);
  const convertedPressedStyles = useStateWithStyleProps(
    props._pressed,
    styleFunctions
  );

  // Add missing required from the 'from' prop to the fallback pressed style
  const fallBackPressedStyles = getKeys(convertedPressedStyles).reduce(
    (final, key: any) => {
      if (getKeys(defaultRNStyles).includes(key)) {
        return {
          [key]: (defaultRNStyles as any)[key],
          ...final,
        };
      }

      return final;
    },
    props.animate
  );

  return {
    pressed,
    setPressed,
    pressedStyles: pressed ? convertedPressedStyles : fallBackPressedStyles,
  };
};
