import {
  MultiComponentConfig,
  StyleFunctionContainer,
} from "./../theme/src/types";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import { boxStyleFunctions } from "../components/Atoms/Box/Box";
import { useStyledProps } from "./useStyledProps";
import { checkKeyAvailability } from "./utils/utils";

export const useMultiComponentConfig = (
  themeComponentKey: string,
  receivedProps: Record<string, any>,
  sizeAndVariantProps: MultiComponentConfig["defaults"] = {
    size: undefined,
    variant: undefined,
  },
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions as StyleFunctionContainer[]
) => {
  const { theme } = useTheme();

  // User overriden props
  const overridenProps = useStyledProps(receivedProps, styleFunctions);

  checkKeyAvailability(themeComponentKey, theme.components, "theme.components");

  const componentStyleConfig = theme.components[
    themeComponentKey
  ] as MultiComponentConfig;
  const activeSizeAndVariantConfig: MultiComponentConfig["defaults"] = {};

  let finalComponentProps: Record<string, any> = {};
  if (componentStyleConfig.hasOwnProperty("defaults")) {
    const defaultComponentConfig = componentStyleConfig[
      "defaults"
    ] as NonNullable<MultiComponentConfig["defaults"]>;

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

    if (!componentStyleConfig.hasOwnProperty("parts")) {
      throw new Error(
        `Key 'parts' does not exist in theme.components["${themeComponentKey}"]`
      );
    }
    const componentParts = componentStyleConfig.parts;

    finalComponentProps = componentParts.reduce(
      (partStyle: any, part: string) => {
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

              checkKeyAvailability(
                part,
                componentStyleConfig!.sizes![
                  activeSizeAndVariantConfig[currProp] as string
                ],
                `theme.components['${String(themeComponentKey)}']['sizes'][${
                  activeSizeAndVariantConfig[currProp]
                }]`
              );

              activeSizeAndVariantStyles =
                componentStyleConfig!.sizes![
                  activeSizeAndVariantConfig[currProp] as string
                ][part];
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

              checkKeyAvailability(
                part,
                componentStyleConfig!.variants![
                  activeSizeAndVariantConfig[currProp] as string
                ],
                `theme.components['${String(themeComponentKey)}']['variants'][${
                  activeSizeAndVariantConfig[currProp]
                }]`
              );

              activeSizeAndVariantStyles =
                componentStyleConfig!.variants![
                  activeSizeAndVariantConfig[currProp] as string
                ][part];
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

        const currentComponentPartProps = {
          ...componentStyleConfig["baseStyle"][part],
          ...componentTypeStyles,
        };

        let finalComponentPartProps = currentComponentPartProps;

        // Adding received props to the root part
        if (!partStyle) {
          finalComponentPartProps = {
            ...currentComponentPartProps,
            ...overridenProps,
            style: {
              ...currentComponentPartProps.style,
              ...overridenProps.style,
            },
          };
        }

        if (partStyle) {
          return {
            ...partStyle,
            [part]: finalComponentPartProps,
          };
        }

        return {
          [part]: finalComponentPartProps,
        };
      },
      null
    );
  } else {
    finalComponentProps = componentStyleConfig["baseStyle"];
  }

  return finalComponentProps;
};
