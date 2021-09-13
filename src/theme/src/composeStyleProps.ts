import { AllProps } from "./styleFunctions";
import { IBasePearlTheme, RestyleFunctionContainer, RNStyle } from "./types";

const composeStyleProps = <
  Theme extends IBasePearlTheme,
  TProps extends AllProps<Theme>
>(
  restyleFunctions: (
    | RestyleFunctionContainer<TProps, Theme>
    | RestyleFunctionContainer<TProps, Theme>[]
  )[]
) => {
  const flattenedRestyleFunctions = restyleFunctions.reduce(
    (acc: RestyleFunctionContainer<TProps, Theme>[], item) => {
      return acc.concat(item);
    },
    []
  );

  const properties = flattenedRestyleFunctions.map((styleFunc) => {
    return styleFunc.property;
  });
  const funcs = flattenedRestyleFunctions
    .sort(
      (styleFuncA, styleFuncB) =>
        Number(styleFuncB.variant) - Number(styleFuncA.variant)
    )
    .map((styleFunc) => {
      return styleFunc.func;
    });

  // TInputProps is a superset of TProps since TProps are only the Restyle Props
  const buildStyle = <TInputProps extends TProps>(
    props: TInputProps,
    theme: any
  ): RNStyle => {
    return funcs.reduce((acc, func) => {
      return Object.assign(acc, func(props, theme));
    }, {});
  };
  return {
    buildStyle,
    properties,
  };
};

export default composeStyleProps;
