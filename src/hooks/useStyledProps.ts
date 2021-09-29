import { useMemo } from "react";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import composeStyleProps from "../theme/src/composeStyleProps";
import { RNStyle, StyleFunctionContainer } from "../theme/src/types";
import { StyleProp } from "react-native";

const filterStyledProps = (props: any, omitList: any) => {
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

export const useStyledProps = (
  props: { [key: string]: any },
  styleFunctions: StyleFunctionContainer[]
) => {
  const { theme } = useTheme();

  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  const style = buildStyleProperties.buildStyle(props, theme);
  const cleanStyleProps = filterStyledProps(
    props,
    buildStyleProperties.properties
  );

  cleanStyleProps.style = { ...style, ...props.style };
  return cleanStyleProps;
};
