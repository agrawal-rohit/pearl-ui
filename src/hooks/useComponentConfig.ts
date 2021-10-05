import { ComponentConfig, StyleFunctionContainer } from "./../theme/src/types";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import { boxStyleFunctions } from "../components/Atoms/Box/Box";
import { useStyledProps } from "./useStyledProps";
import { checkKeyAvailability } from "./utils/utils";

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
  const overridenProps = useStyledProps(receivedProps, styleFunctions);

  checkKeyAvailability(themeComponentKey, theme.components, "theme.components");

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
          checkKeyAvailability(
            "sizes",
            componentStyleConfig,
            `theme.components['${String(themeComponentKey)}']`
          );

          checkKeyAvailability(
            activeSizeAndVariantConfig["size"] as string,
            componentStyleConfig!.sizes!,
            `theme.components['${String(themeComponentKey)}']['sizes']`
          );

          activeSizeAndVariantStyles =
            componentStyleConfig!.sizes![
              activeSizeAndVariantConfig[currProp] as string
            ];
        } else {
          checkKeyAvailability(
            "variants",
            componentStyleConfig,
            `theme.components['${String(themeComponentKey)}']`
          );

          checkKeyAvailability(
            activeSizeAndVariantConfig["variant"] as string,
            componentStyleConfig!.variants!,
            `theme.components['${String(themeComponentKey)}']['variants']`
          );

          activeSizeAndVariantStyles =
            componentStyleConfig!.variants![
              activeSizeAndVariantConfig[currProp] as string
            ];
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
    ...overridenProps,
    style: {
      ...componentStyles.style,
      ...overridenProps.style,
    },
  };
};
