import { useMemo } from "react";
import { getKeys } from "../theme/utils/type-helpers";
import { StyleFunctionContainer } from "../theme/src/types";
import { useTheme } from "./useTheme";
import { useDimensions } from "./useDimensions";
import { composeCleanStyleProps, composeStyleProps } from "./utils/utils";
import {
  layoutPropertiesShorthand,
  spacingPropertiesShorthand,
} from "../theme/src/style-properties";
import _ from "lodash";

const shorthandPropMapper = {
  ...layoutPropertiesShorthand,
  ...spacingPropertiesShorthand,
};

/**
 * Converts Moti Props using style props as well
 * @param props - The props to convert
 * @param styleFunctions - The style functions to use
 * @returns The converted props
 */
export const useMotiWithStyleProps = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[]
) => {
  const { theme, colorMode } = useTheme();
  const dimensions = useDimensions();

  // Compose style properties
  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  // Remove shadowOffset and textShadowOffset from componentStyles
  const componentStyles = _.omit(props.style, [
    "shadowOffset",
    "textShadowOffset",
  ]);

  // Convert 'from' prop
  if (props.from) {
    props.from = composeCleanStyleProps(props.from, buildStyleProperties, {
      theme,
      colorMode,
      dimensions,
    });
  }

  // Convert 'animate' prop
  if (props.animate) {
    props.animate = composeCleanStyleProps(
      props.animate,
      buildStyleProperties,
      {
        theme,
        colorMode,
        dimensions,
      }
    );

    // Merge componentStyles and animate
    props.animate = {
      ...componentStyles,
      ...props.animate,
    };
  }

  // Convert 'transition' prop
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

    // Convert style props
    props.transition = composeCleanStyleProps(
      props.transition,
      buildStyleProperties,
      {
        theme,
        colorMode,
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

  // Convert 'exit' prop
  if (props.exit) {
    props.exit = composeCleanStyleProps(props.exit, buildStyleProperties, {
      theme,
      colorMode,
      dimensions,
    });
  }

  // Convert 'exitTransition' prop
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

    // Convert style props
    props.exitTransition = composeCleanStyleProps(
      props.exitTransition,
      buildStyleProperties,
      {
        theme,
        colorMode,
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

  return props;
};
