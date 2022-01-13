import { useMemo } from "react";
import { getKeys } from "../theme/utils/typeHelpers";
import { StyleFunctionContainer } from "../theme/src/types";
import _ from "lodash";
import { useStyledProps } from "./useStyledProps";
import { useTheme } from "./useTheme";
import { useDimensions } from "./useDimensions";
import composeStyleProps from "../theme/src/composeStyleProps";
import { composeMotiProps } from "./utils/utils";

export const useMotiWithStyleProps = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[]
) => {
  const { theme } = useTheme();
  const dimensions = useDimensions();

  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  // Convert Moti Props using style props as well
  // From
  if (props.from)
    props.from = composeMotiProps(props.from, buildStyleProperties, {
      theme,
      dimensions,
    });

  // Animate
  if (props.animate)
    props.animate = composeMotiProps(props.animate, buildStyleProperties, {
      theme,
      dimensions,
    });

  // Transition
  if (props.transition)
    props.transition = composeMotiProps(
      props.transition,
      buildStyleProperties,
      {
        theme,
        dimensions,
      }
    );

  // Exit
  if (props.exit)
    props.exit = composeMotiProps(props.exit, buildStyleProperties, {
      theme,
      dimensions,
    });

  // Exit Transform
  if (props.exitTransition)
    props.exitTransition = composeMotiProps(
      props.exitTransition,
      buildStyleProperties,
      {
        theme,
        dimensions,
      }
    );

  if (props.state) {
    const stateKeys = getKeys(props.state);
    props.state = stateKeys.reduce((convertedState, key) => {
      return {
        ...convertedState,
        [key]: composeMotiProps(props.state[key], buildStyleProperties, {
          theme,
          dimensions,
        }),
      };
    }, {});
  }

  return props;
};
