import { ComponentConfig } from "./../theme/src/types";
import { useMemo } from "react";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import composeStyleProps from "../theme/src/composeStyleProps";
import { boxStyleFunctions } from "../components/Atoms/Box/Box";

const filterComponentProps = <
  ComponentProps extends Record<string, any>,
  StyleProps extends Record<string, unknown> & ComponentProps
>(
  props: StyleProps,
  omitList: (keyof ComponentProps)[]
) => {
  const omittedProp = omitList.reduce<Record<keyof ComponentProps, boolean>>(
    (acc: any, prop: any) => {
      acc[prop] = true;
      return acc;
    },
    {} as Record<keyof ComponentProps, boolean>
  );

  return getKeys(props).reduce((acc, key) => {
    if (!omittedProp[key as keyof ComponentProps]) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as StyleProps);
};

export const useComponentConfig = (
  themeComponentKey: string,
  componentTypeProps: ComponentConfig["defaults"],
  styleFunctions: any = boxStyleFunctions
) => {
  const { theme } = useTheme();

  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  const componentStyleConfig = theme.components[themeComponentKey];

  const componentTypeConfig: ComponentConfig["defaults"] = {};
  componentTypeConfig.size = componentTypeProps.size
    ? componentTypeProps.size
    : componentStyleConfig["defaults"].size;
  componentTypeConfig.variant = componentTypeProps.variant
    ? componentTypeProps.variant
    : componentStyleConfig["defaults"].variant;

  const componentTypeStyles: Record<string, any> = getKeys(
    componentTypeConfig
  ).reduce((style: any, currProp: "size" | "variant") => {
    if (style) {
      return {
        ...style,
        ...componentStyleConfig[currProp.concat("s") as "sizes" | "variants"][
          String(componentTypeConfig[currProp])
        ],
      };
    }

    return componentStyleConfig[currProp.concat("s") as "sizes" | "variants"][
      String(componentTypeConfig[currProp])
    ];
  }, null);

  const finalComponentProps = {
    ...componentStyleConfig["baseStyle"],
    ...componentTypeStyles,
  };

  const style = buildStyleProperties.buildStyle(finalComponentProps, theme);
  const cleanStyleProps: Record<string, any> = {
    ...filterComponentProps(
      finalComponentProps,
      buildStyleProperties.properties
    ),
    style: {},
  };

  cleanStyleProps.style = style;
  return cleanStyleProps;
};
