import { useMemo } from "react";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import composeStyleProps from "../theme/src/composeStyleProps";

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

const useStyledProps = (restyleFunctions: any, props: any) => {
  const { theme } = useTheme();

  const buildStyleProperties = useMemo(
    () => composeStyleProps(restyleFunctions),
    [restyleFunctions]
  );

  const style = buildStyleProperties.buildStyle(props, theme);
  const cleanStyleProps = filterStyledProps(
    props,
    buildStyleProperties.properties
  );

  cleanStyleProps.style = [style, props.style].filter(Boolean);
  return cleanStyleProps;
};

export default useStyledProps;
