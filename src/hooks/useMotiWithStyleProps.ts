import { useMemo } from "react";
import { getKeys } from "../theme/utils/typeHelpers";
import { StyleFunctionContainer } from "../theme/src/types";
import _ from "lodash";
import { useTheme } from "./useTheme";
import { useDimensions } from "./useDimensions";
import { composeCleanStyleProps, composeStyleProps } from "./utils/utils";

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

  const componentStyles = _.omit(props.style, [
    "shadowOffset",
    "textShadowOffset",
  ]);

  // Convert Moti Props using style props as well
  // From
  if (props.from) {
    props.from = composeCleanStyleProps(props.from, buildStyleProperties, {
      theme,
      dimensions,
    });
  }

  // Animate
  if (props.animate) {
    props.animate = composeCleanStyleProps(
      props.animate,
      buildStyleProperties,
      {
        theme,
        dimensions,
      }
    );

    props.animate = {
      ...componentStyles,
      ...props.animate,
    };
  }

  // Transition
  if (props.transition) {
    props.transition = composeCleanStyleProps(
      props.transition,
      buildStyleProperties,
      {
        theme,
        dimensions,
      }
    );
  }

  // Exit
  if (props.exit) {
    props.exit = composeCleanStyleProps(props.exit, buildStyleProperties, {
      theme,
      dimensions,
    });
  }

  // Exit Transform
  if (props.exitTransition) {
    props.exitTransition = composeCleanStyleProps(
      props.exitTransition,
      buildStyleProperties,
      {
        theme,
        dimensions,
      }
    );
  }

  if (props.state) {
    const stateKeys = getKeys(props.state);
    props.state = stateKeys.reduce((convertedState, key) => {
      return {
        ...convertedState,
        [key]: composeCleanStyleProps(props.state[key], buildStyleProperties, {
          theme,
          dimensions,
        }),
      };
    }, {});
  }

  return props;
};
