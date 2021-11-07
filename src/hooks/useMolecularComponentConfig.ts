import {
  MolecularComponentConfig,
  StyleFunctionContainer,
} from "../theme/src/types";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import { boxStyleFunctions } from "../components/Atoms/Box/Box";
import { useStyledProps } from "./useStyledProps";
import { checkKeyAvailability } from "./utils/utils";

/**
 * useMolecularComponentConfig is a custom hook used to convert a molecular component style config to the appropriate React Native styles. It takes the benefits of the useAtomicComponentConfig hook to the next level, allowing you to create complex components by combining different atomic components while still maintaining the ease of the styling through a component style config.
 * @param themeComponentKey Name of the component in PearlTheme.components who's config needs to be used
 * @param receivedProps Raw props passed to the component where the hook is being used
 * @param sizeAndVariantProps Custom size and variant configuration to use
 * @param styleFunctions List of style functions to use for computing the received style props
 * @param targetKeyForAdditionalStyleProps The part where the style props passed to the component instance should be reflected. If undefined, the style props are passed to the first part as specified in the config
 * @param targetKeyForNativeProps The part where other native props (non-style props) passed to the component instance should be reflected. If undefined, the native props are passed to the first part as specified in the config
 * @returns
 */
export const useMolecularComponentConfig = (
  themeComponentKey: string,
  receivedProps: Record<string, any>,
  sizeAndVariantProps: MolecularComponentConfig["defaults"] = {
    size: undefined,
    variant: undefined,
  },
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions as StyleFunctionContainer[],
  targetKeyForAdditionalStyleProps: string | undefined = undefined,
  targetKeyForNativeProps: string | undefined = undefined
) => {
  const { theme } = useTheme();

  // User overriden props
  const overridenProps = useStyledProps(receivedProps, styleFunctions);

  checkKeyAvailability(themeComponentKey, theme.components, "theme.components");

  const componentStyleConfig = theme.components[
    themeComponentKey
  ] as MolecularComponentConfig;
  const activeSizeAndVariantConfig: MolecularComponentConfig["defaults"] = {};

  let finalComponentProps: Record<string, any> = {};
  if (componentStyleConfig.hasOwnProperty("defaults")) {
    const defaultComponentConfig = componentStyleConfig[
      "defaults"
    ] as NonNullable<MolecularComponentConfig["defaults"]>;

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

              // checkKeyAvailability(
              //   part,
              //   componentStyleConfig!.sizes![
              //     activeSizeAndVariantConfig[currProp] as string
              //   ],
              //   `theme.components['${String(themeComponentKey)}']['sizes'][${
              //     activeSizeAndVariantConfig[currProp]
              //   }]`
              // );

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

              // checkKeyAvailability(
              //   part,
              //   componentStyleConfig!.variants![
              //     activeSizeAndVariantConfig[currProp] as string
              //   ],
              //   `theme.components['${String(themeComponentKey)}']['variants'][${
              //     activeSizeAndVariantConfig[currProp]
              //   }]`
              // );

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

        let currentComponentPartProps = {
          ...componentStyleConfig["baseStyle"][part],
          ...componentTypeStyles,
        };

        if (
          targetKeyForAdditionalStyleProps &&
          part === targetKeyForAdditionalStyleProps
        ) {
          currentComponentPartProps = {
            ...currentComponentPartProps,
            style: {
              ...currentComponentPartProps.style,
              ...overridenProps.style,
            },
          };
        }

        if (targetKeyForNativeProps && part === targetKeyForNativeProps) {
          const { style, ...nativeOverridenProps } = overridenProps;
          currentComponentPartProps = {
            ...currentComponentPartProps,
            ...nativeOverridenProps,
          };
        }

        if (partStyle) {
          return {
            ...partStyle,
            [part]: currentComponentPartProps,
          };
        }

        if (!targetKeyForAdditionalStyleProps) {
          currentComponentPartProps = {
            ...currentComponentPartProps,
            style: {
              ...currentComponentPartProps.style,
              ...overridenProps.style,
            },
          };
        }

        if (!targetKeyForNativeProps) {
          const { style, ...nativeOverridenProps } = overridenProps;
          currentComponentPartProps = {
            ...currentComponentPartProps,
            ...nativeOverridenProps,
          };
        }

        return {
          [part]: currentComponentPartProps,
        };
      },
      null
    );
  } else {
    finalComponentProps = componentStyleConfig["baseStyle"];
  }

  return finalComponentProps;
};
