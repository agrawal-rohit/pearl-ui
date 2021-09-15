import { useMemo } from "react";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import composeStyleProps from "../theme/src/composeStyleProps";
import { boxStyleFunctions } from "../components/Atoms/Box/Box";

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

const useComponentConfig = (
  themeComponentKey: any,
  componentTypeProps: any,
  styleFunctions: any = boxStyleFunctions
) => {
  const { theme } = useTheme();

  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  const componentStyleConfig = theme.components[themeComponentKey];
  const componentTypeConfig = { size: "temp", variant: "temp" };
  componentTypeConfig.size = componentTypeProps.size
    ? componentTypeProps.size
    : componentStyleConfig["defaults"].size;
  componentTypeConfig.variant = componentTypeProps.variant
    ? componentTypeProps.variant
    : componentStyleConfig["defaults"].variant;

  const componentTypeStyles = getKeys(componentTypeConfig).reduce(
    (style: any, currProp: "size" | "variant") => {
      if (style) {
        return {
          ...style,
          ...componentStyleConfig[currProp.concat("s")][
            componentTypeConfig[currProp]
          ],
        };
      }

      return componentStyleConfig[currProp.concat("s")][
        componentTypeConfig[currProp]
      ];
    },
    null
  );

  const finalComponentProps = {
    ...componentStyleConfig["baseStyle"],
    ...componentTypeStyles,
  };

  const style = buildStyleProperties.buildStyle(finalComponentProps, theme);
  const cleanStyleProps = filterStyledProps(
    finalComponentProps,
    buildStyleProperties.properties
  );

  cleanStyleProps.style = [style, finalComponentProps.style].filter(Boolean);
  return cleanStyleProps;
};

export default useComponentConfig;
