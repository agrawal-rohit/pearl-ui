import _ from "lodash";
import { AllProps } from "../../theme/src/styleFunctions";
import {
  Dimensions,
  FinalPearlTheme,
  StyleFunctionContainer,
} from "../../theme/src/types";
import { getKeys } from "../../theme/utils/typeHelpers";

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

  // Convert the component props to the equivalent style properties
  const buildStyle = (
    props: AllProps,
    { theme, dimensions }: { theme: FinalPearlTheme; dimensions: Dimensions }
  ) => {
    return funcs.reduce((acc: any, func: any) => {
      return Object.assign(acc, func(props, { theme, dimensions }));
    }, {});
  };

  return {
    buildStyle,
    properties,
  };
};

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

export const buildFinalStyleProps = (
  props: Record<string, any>,
  buildStyleProperties: any,
  { theme, dimensions }: { theme: FinalPearlTheme; dimensions: Dimensions }
) => {
  const coreVisualStyle = buildStyleProperties.buildStyle(props, {
    theme,
    dimensions,
  });

  const cleanStyleProps = filterStyledProps(
    props,
    buildStyleProperties.properties
  );

  cleanStyleProps.style = { ...coreVisualStyle, ...props.style };
  return cleanStyleProps;
};

export const composeCleanStyleProps = (
  props: Record<string, any>,
  buildStyleProperties: any,
  { theme, dimensions }: { theme: FinalPearlTheme; dimensions: Dimensions }
) => {
  let motiStyleProps = buildFinalStyleProps(props, buildStyleProperties, {
    theme,
    dimensions,
  });
  motiStyleProps = { ...motiStyleProps, ...motiStyleProps.style };
  motiStyleProps = _.omit(motiStyleProps, ["style", "display", "shadowOffset"]);
  return motiStyleProps;
};
