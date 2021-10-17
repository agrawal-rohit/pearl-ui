import { useMemo } from "react";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import composeStyleProps from "../theme/src/composeStyleProps";
import { StyleFunctionContainer } from "../theme/src/types";

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

/**
 * Hook to convert the received style props to appropriate React Native styles
 * @param props Raw props passed to the component where the hook is being used
 * @param styleFunctions List of style functions to use for computing the received style props
 * @returns
 */
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
