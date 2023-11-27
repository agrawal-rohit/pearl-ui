import _ from "lodash";
import { AllProps } from "../../theme/src/style-functions";
import {
  Dimensions,
  FinalPearlTheme,
  StyleFunctionContainer,
} from "../../theme/src/types";
import { getKeys } from "../../theme/utils/type-helpers";
import { ColorMode } from "../../theme/src/theme-context";

export const MOTI_PROPS = [
  "animate",
  "from",
  "transition",
  "delay",
  "state",
  "stylePriority",
  "onDidAnimate",
  "exit",
  "exitTransition",
  "animateInitialState",
];

/**
 * Checks if a key exists in an object and throws an error if it doesn't.
 * @param key - The key to check for.
 * @param object - The object to check in.
 * @param objectVarName - Optional name of the object variable to include in the error message.
 * @throws {Error} - If the key does not exist in the object.
 */
export const checkKeyAvailability = (
  key: string,
  object: object,
  objectVarName: string | undefined = undefined
) => {
  if (!object.hasOwnProperty(key)) {
    throw new Error(
      `Key '${key}' does not exist in ${objectVarName ? objectVarName : object}`
    );
  }
};

/**
 * Composes style properties from an array of style functions.
 * @param styleFunctions - An array of style functions.
 * @returns An object containing a buildStyle function and an array of property names.
 */
export const composeStyleProps = (styleFunctions: StyleFunctionContainer[]) => {
  // Create a single array of all property objects
  const flattenedStyleFunctions = styleFunctions.reduce(
    (acc: StyleFunctionContainer[], item: any) => {
      return acc.concat(item);
    },
    []
  );

  // Array of all property names
  const properties = flattenedStyleFunctions.map((styleFunc: any) => {
    return styleFunc.property;
  });

  const funcs = flattenedStyleFunctions.map((styleFunc: any) => {
    return styleFunc.func;
  });

  /**
   * Converts component props to the equivalent style properties.
   * @param props - The component props.
   * @param theme - The theme object.
   * @param dimensions - The dimensions object.
   * @returns An object containing the style properties.
   */
  const buildStyle = (
    props: AllProps,
    {
      theme,
      colorMode,
      dimensions,
    }: { theme: FinalPearlTheme; colorMode: ColorMode; dimensions: Dimensions }
  ) => {
    return funcs.reduce((acc: any, func: any) => {
      return Object.assign(acc, func(props, { theme, colorMode, dimensions }));
    }, {});
  };

  return {
    buildStyle,
    properties,
  };
};

/**
 * Filters out properties from an object based on a list of properties to omit.
 * @param props - The object to filter.
 * @param omitList - The list of properties to omit.
 * @returns An object with the omitted properties removed.
 */
export const filterStyledProps = (props: any, omitList: any) => {
  const omittedProp = omitList.reduce((acc: any, prop: any) => {
    acc[prop] = true;
    return acc;
  }, {});

  return getKeys(props).reduce((acc: any, key: any) => {
    if (!omittedProp[key]) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
};

/**
 * Builds the final style properties object by composing the core visual style with the component props.
 * @param props - The component props.
 * @param buildStyleProperties - The style properties to build.
 * @param theme - The theme object.
 * @param dimensions - The dimensions object.
 * @returns An object containing the final style properties.
 */
export const buildFinalStyleProps = (
  props: Record<string, any>,
  buildStyleProperties: any,
  {
    theme,
    colorMode,
    dimensions,
  }: { theme: FinalPearlTheme; colorMode: ColorMode; dimensions: Dimensions }
) => {
  const coreVisualStyle = buildStyleProperties.buildStyle(props, {
    theme,
    colorMode,
    dimensions,
  });

  const cleanStyleProps = filterStyledProps(
    props,
    buildStyleProperties.properties
  );

  cleanStyleProps.style = { ...coreVisualStyle, ...props.style };
  return cleanStyleProps;
};

/**
 * Composes the clean style properties object by filtering out unnecessary properties.
 * @param props - The component props.
 * @param buildStyleProperties - The style properties to build.
 * @param theme - The theme object.
 * @param dimensions - The dimensions object.
 * @returns An object containing the clean style properties.
 */
export const composeCleanStyleProps = (
  props: Record<string, any>,
  buildStyleProperties: any,
  {
    theme,
    colorMode,
    dimensions,
  }: { theme: FinalPearlTheme; colorMode: ColorMode; dimensions: Dimensions }
) => {
  let motiStyleProps = buildFinalStyleProps(props, buildStyleProperties, {
    theme,
    colorMode,
    dimensions,
  });
  motiStyleProps = { ...motiStyleProps, ...motiStyleProps.style };
  motiStyleProps = _.omit(motiStyleProps, ["style", "display", "shadowOffset"]);
  return motiStyleProps;
};
