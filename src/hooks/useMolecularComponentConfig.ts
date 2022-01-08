import {
  ColorScheme,
  FinalPearlTheme,
  MolecularComponentConfig,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../theme/src/types";
import { getKeys } from "../theme/utils/typeHelpers";
import { useTheme } from "./useTheme";
import { checkKeyAvailability } from "./utils/utils";
import { useColorScheme } from "./useColorScheme";
import { useResponsiveProp } from "./useResponsiveProp";

/**
 * useMolecularComponentConfig is a custom hook used to convert a molecular component style config to the appropriate React Native styles. It takes the benefits of the useAtomicComponentConfig hook to the next level, allowing you to create complex components by combining different atomic components while still maintaining the ease of the styling through a component style config.
 * @param themeComponentKey Name of the component in PearlTheme.components who's config needs to be used
 * @param receivedProps Raw props passed to the component where the hook is being used
 * @param sizeAndVariantProps Custom size and variant configuration to use
 * @param colorScheme Active color scheme of the component
 * @param styleFunctions List of style functions to use for computing the received style props
 * @param targetKeyForAdditionalStyleProps The part where the style props passed to the component instance should be reflected. If undefined, the style props are passed to the first part as specified in the config
 * @param targetKeyForNativeProps The part where other native props (non-style props) passed to the component instance should be reflected. If undefined, the native props are passed to the first part as specified in the config
 * @returns
 */
export const useMolecularComponentConfig = (
  themeComponentKey: keyof FinalPearlTheme["components"],
  receivedProps: Record<string, any>,
  sizeAndVariantProps: {
    size?: ResponsiveValue<string | undefined>;
    variant?: ResponsiveValue<string | undefined>;
  } = {
    size: undefined,
    variant: undefined,
  },
  colorScheme: ColorScheme = "primary",
  targetKeyForOverridenStyleProps: string | undefined = undefined,
  targetKeyForOverridenNativeProps: string | undefined = undefined
) => {
  const { theme } = useTheme();

  checkKeyAvailability(
    themeComponentKey as string,
    theme.components,
    "theme.components"
  );

  // Responsive Size and Variant
  const sizeForCurrentScreenSize = useResponsiveProp(
    sizeAndVariantProps.size
  ) as string;
  const variantForCurrentScreenSize = useResponsiveProp(
    sizeAndVariantProps.variant
  ) as string;

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
      activeSizeAndVariantConfig.size = sizeForCurrentScreenSize
        ? sizeForCurrentScreenSize
        : defaultComponentConfig.size;
    }

    if (defaultComponentConfig.hasOwnProperty("variant")) {
      activeSizeAndVariantConfig.variant = variantForCurrentScreenSize
        ? variantForCurrentScreenSize
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
          targetKeyForOverridenStyleProps &&
          part === targetKeyForOverridenStyleProps
        ) {
          currentComponentPartProps = {
            ...currentComponentPartProps,
            style: {
              ...currentComponentPartProps.style,
              ...receivedProps.style,
            },
          };
        }

        if (
          targetKeyForOverridenNativeProps &&
          part === targetKeyForOverridenNativeProps
        ) {
          const { style, ...nativeOverridenProps } = receivedProps;
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

        if (!targetKeyForOverridenStyleProps) {
          currentComponentPartProps = {
            ...currentComponentPartProps,
            style: {
              ...currentComponentPartProps.style,
              ...receivedProps.style,
            },
          };
        }

        if (!targetKeyForOverridenNativeProps) {
          const { style, ...nativeOverridenProps } = receivedProps;
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
    const firstPart = componentStyleConfig.parts[0];

    // Pass the overriden props to the first part
    finalComponentProps = {
      ...finalComponentProps,
      [firstPart]: {
        ...finalComponentProps[firstPart],
        ...receivedProps,
        style: {
          ...finalComponentProps[firstPart].style,
          ...receivedProps.style,
        },
      },
    };
  }

  finalComponentProps = useColorScheme(colorScheme, finalComponentProps);

  return finalComponentProps;
};
