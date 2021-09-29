import { ComponentConfig } from "./../theme/src/types";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import { boxStyleFunctions } from "../components/Atoms/Box/Box";
import { useStyledProps } from "./useStyledProps";

export const useComponentConfig = (
  themeComponentKey: string,
  componentTypeProps: ComponentConfig["defaults"],
  overrideProps: any,
  styleFunctions: any = boxStyleFunctions
) => {
  const { theme } = useTheme();

  // User overriden props
  const overridenStyles = useStyledProps(overrideProps, styleFunctions);

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

  const componentStyles = useStyledProps(finalComponentProps, styleFunctions);

  return {
    ...componentStyles,
    style: {
      ...componentStyles.style,
      ...overridenStyles.style,
    },
  };
};
