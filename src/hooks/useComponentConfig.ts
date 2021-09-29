import { ComponentConfig, StyleFunctionContainer } from "./../theme/src/types";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import { boxStyleFunctions } from "../components/Atoms/Box/Box";
import { useStyledProps } from "./useStyledProps";

export const useComponentConfig = (
  themeComponentKey: string,
  receivedProps: Record<string, any>,
  sizeAndVariantProps: ComponentConfig["defaults"] = {
    size: undefined,
    variant: undefined,
  },
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions as StyleFunctionContainer[]
) => {
  const { theme } = useTheme();

  // User overriden props
  const overridenStyles = useStyledProps(receivedProps, styleFunctions);

  if (
    !theme.components ||
    !theme.components.hasOwnProperty(themeComponentKey)
  ) {
    throw new Error(
      `Key '${themeComponentKey}' does not exist in theme.components`
    );
  }

  const componentStyleConfig = theme.components[themeComponentKey];
  const activeSizeAndVariantConfig: ComponentConfig["defaults"] = {};

  let finalComponentProps: Record<string, any> = {};
  if (componentStyleConfig.hasOwnProperty("defaults")) {
    const defaultComponentConfig = componentStyleConfig[
      "defaults"
    ] as NonNullable<ComponentConfig["defaults"]>;

    if (defaultComponentConfig.hasOwnProperty("size")) {
      activeSizeAndVariantConfig.size = sizeAndVariantProps.size
        ? sizeAndVariantProps.size
        : defaultComponentConfig.size;
    }

    if (defaultComponentConfig.hasOwnProperty("variant")) {
      activeSizeAndVariantConfig.variant = sizeAndVariantProps.variant
        ? sizeAndVariantProps.variant
        : defaultComponentConfig.variant;
    }

    const componentTypeStyles: Record<string, any> = getKeys(
      activeSizeAndVariantConfig
    ).reduce(
      (style: any, currProp: keyof typeof activeSizeAndVariantConfig) => {
        let activeSizeAndVariantStyles: Record<string, any>;
        if (currProp === "size") {
          if (componentStyleConfig.hasOwnProperty("sizes")) {
            activeSizeAndVariantStyles =
              componentStyleConfig!.sizes![
                activeSizeAndVariantConfig[currProp] as string
              ];
          } else {
            throw new Error(
              `Key 'sizes' does not exist in theme.components['${String(
                themeComponentKey
              )}']`
            );
          }
        } else {
          if (componentStyleConfig.hasOwnProperty("variants")) {
            activeSizeAndVariantStyles =
              componentStyleConfig!.variants![
                activeSizeAndVariantConfig[currProp] as string
              ];
          } else {
            throw new Error(
              `Key 'variants' does not exist in theme.components['${String(
                themeComponentKey
              )}']`
            );
          }
        }

        if (style) {
          return {
            ...style,
            ...activeSizeAndVariantStyles,
          };
        }

        return activeSizeAndVariantStyles;
      },
      null
    );

    finalComponentProps = {
      ...componentStyleConfig["baseStyle"],
      ...componentTypeStyles,
    };
  } else {
    finalComponentProps = componentStyleConfig["baseStyle"];
  }

  const componentStyles = useStyledProps(finalComponentProps, styleFunctions);

  return {
    ...componentStyles,
    style: {
      ...componentStyles.style,
      ...overridenStyles.style,
    },
  };
};
