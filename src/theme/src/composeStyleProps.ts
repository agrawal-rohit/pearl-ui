const composeStyleProps = (styleFunctions: any) => {
  // Create a single array of all property objects
  const flattenedStyleFunctions = styleFunctions.reduce(
    (acc: any, item: any) => {
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
  const buildStyle = (props: any, theme: any) => {
    return funcs.reduce((acc: any, func: any) => {
      return Object.assign(acc, func(props, theme));
    }, {});
  };

  return {
    buildStyle,
    properties,
  };
};

export default composeStyleProps;
