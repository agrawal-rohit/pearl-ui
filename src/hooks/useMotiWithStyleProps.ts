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
import { removeUndefined } from "../theme/utils/utils";

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

  // Convert 'from', 'animate', 'transition', 'exit', 'exitTransition' props
  ["from", "animate", "transition", "exit", "exitTransition"].forEach(
    (prop) => {
      if (prop === "animate" && props[prop] === undefined) props[prop] = {};

      if (props[prop]) {
        props[prop] = composeCleanStyleProps(
          props[prop],
          buildStyleProperties,
          {
            theme,
            colorMode,
            dimensions,
          }
        );

        if (prop === "animate") {
          // Merge componentStyles and animate
          props.animate = {
            ...componentStyles,
            ...removeUndefined(props.animate),
          };
        }

        if (["transition", "exitTransition"].includes(prop)) {
          // Filter object values from 'transition' or 'exitTransition'
          const keysWithObjectValues = getKeys(props[prop]).filter(
            (key) => typeof props[prop][key] === "object"
          );
          const propsWithObjectValues = _.pick(
            props[prop],
            keysWithObjectValues
          );
          const nullObject = keysWithObjectValues.reduce((obj, key) => {
            return {
              ...obj,
              [key]: null,
            };
          }, {});
          props[prop] = { ...props[prop], ...removeUndefined(nullObject) };

          // Add the filtered values back into 'transition' or 'exitTransition'
          props[prop] = keysWithObjectValues.reduce((obj, key: any) => {
            let finalKey = key;
            if (getKeys(shorthandPropMapper).includes(key)) {
              finalKey = (shorthandPropMapper as any)[key];
            }

            return {
              ...obj,
              [finalKey]: propsWithObjectValues[key],
            };
          }, props[prop]);
        }
      }
    }
  );

  return props;
};
