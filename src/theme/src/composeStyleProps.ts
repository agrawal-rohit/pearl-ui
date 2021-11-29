import { AllProps } from "./styleFunctions";
import { BasePearlTheme, Dimensions, StyleFunctionContainer } from "./types";

const composeStyleProps = (styleFunctions: StyleFunctionContainer[]) => {
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
    { theme, dimensions }: { theme: BasePearlTheme; dimensions: Dimensions }
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

export default composeStyleProps;
