const composeStyleProps = (styleFunctions: any) => {
  const flattenedStyleFunctions = styleFunctions.reduce(
    (acc: any, item: any) => {
      return acc.concat(item);
    },
    []
  );

  const properties = flattenedStyleFunctions.map((styleFunc: any) => {
    return styleFunc.property;
  });
  const funcs = flattenedStyleFunctions
    .sort(
      (styleFuncA: any, styleFuncB: any) =>
        Number(styleFuncB.variant) - Number(styleFuncA.variant)
    )
    .map((styleFunc: any) => {
      return styleFunc.func;
    });

  // TInputProps is a superset of TProps since TProps are only the Restyle Props
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
