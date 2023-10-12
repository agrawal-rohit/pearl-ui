import { useMemo } from "react";
import { getKeys } from "../theme/utils/type-helpers";
import { StyleFunctionContainer } from "../theme/src/types";
import _, { keys } from "lodash";
import { useTheme } from "./useTheme";
import { useDimensions } from "./useDimensions";
import { composeCleanStyleProps, composeStyleProps } from "./utils/utils";
import {
  layoutPropertiesShorthand,
  spacingPropertiesShorthand,
} from "../theme/src/style-properties";

const shorthandPropMapper = {
  ...layoutPropertiesShorthand,
  ...spacingPropertiesShorthand,
};

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
    // Filter object values from 'transition'
    const keysWithObjectValues = getKeys(props.transition).filter(
      (key) => typeof props.transition[key] === "object"
    );
    const propsWithObjectValues = _.pick(
      props.transition,
      keysWithObjectValues
    );
    const nullObject = keysWithObjectValues.reduce((obj, key) => {
      return {
        ...obj,
        [key]: null,
      };
    }, {});
    props.transition = { ...props.transition, ...nullObject };

    // Comvert style props
    props.transition = composeCleanStyleProps(
      props.transition,
      buildStyleProperties,
      {
        theme,
        dimensions,
      }
    );

    // Add the filtered values back into 'transition'
    props.transition = keysWithObjectValues.reduce((obj, key: any) => {
      let finalKey = key;
      if (getKeys(shorthandPropMapper).includes(key)) {
        finalKey = (shorthandPropMapper as any)[key];
      }

      return {
        ...obj,
        [finalKey]: propsWithObjectValues[key],
      };
    }, props.transition);
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
    // Filter object values from 'exitTransition'
    const keysWithObjectValues = getKeys(props.exitTransition).filter(
      (key) => typeof props.exitTransition[key] === "object"
    );
    const propsWithObjectValues = _.pick(
      props.exitTransition,
      keysWithObjectValues
    );
    const nullObject = keysWithObjectValues.reduce((obj, key) => {
      return {
        ...obj,
        [key]: null,
      };
    }, {});
    props.exitTransition = { ...props.exitTransition, ...nullObject };

    // Comvert style props
    props.exitTransition = composeCleanStyleProps(
      props.exitTransition,
      buildStyleProperties,
      {
        theme,
        dimensions,
      }
    );

    // Add the filtered values back into 'exitTransition'
    props.exitTransition = keysWithObjectValues.reduce((obj, key: any) => {
      let finalKey = key;
      if (getKeys(shorthandPropMapper).includes(key)) {
        finalKey = (shorthandPropMapper as any)[key];
      }

      return {
        ...obj,
        [finalKey]: propsWithObjectValues[key],
      };
    }, props.exitTransition);
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
