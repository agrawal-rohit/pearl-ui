import {
  IBasePearlTheme,
  RestyleFunctionContainer,
  RNStyle,
} from "./../theme/src/types";
import { useMemo } from "react";
import { StyleProp } from "react-native";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import composeStyleProps from "../theme/src/composeStyleProps";

const filterRestyleProps = <
  TRestyleProps,
  TProps extends Record<string, unknown> & TRestyleProps
>(
  props: TProps,
  omitList: (keyof TRestyleProps)[]
): Omit<TProps, keyof TRestyleProps> => {
  const omittedProp = omitList.reduce<Record<keyof TRestyleProps, boolean>>(
    (acc, prop) => {
      acc[prop] = true;
      return acc;
    },
    {} as Record<keyof TRestyleProps, boolean>
  );

  return getKeys(props).reduce((acc, key) => {
    if (!omittedProp[key as keyof TRestyleProps]) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as TProps);
};

const useRestyle = <
  Theme extends IBasePearlTheme,
  TRestyleProps extends Record<string, any>,
  TProps extends TRestyleProps & { style?: StyleProp<RNStyle> }
>(
  restyleFunctions: (
    | RestyleFunctionContainer<TProps, Theme>
    | RestyleFunctionContainer<TProps, Theme>[]
  )[],
  props: TProps
) => {
  const { theme } = useTheme();

  const composedRestyleFunction = useMemo(
    () => composeStyleProps(restyleFunctions),
    [restyleFunctions]
  );

  const style = composedRestyleFunction.buildStyle(props, theme);
  const cleanProps = filterRestyleProps(
    props,
    composedRestyleFunction.properties
  );

  (cleanProps as TProps).style = [style, props.style].filter(Boolean);
  return cleanProps;
};

export default useRestyle;
