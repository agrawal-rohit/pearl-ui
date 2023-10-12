import {
  AtomicComponentConfig,
  ColorScheme,
  FinalPearlTheme,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../theme/src/types";
import { getKeys } from "../theme/utils/type-helpers";

import { useTheme } from "./useTheme";
import { useStyleProps } from "./useStyleProps";
import { checkKeyAvailability } from "./utils/utils";
import { useColorScheme } from "./useColorScheme";
import { useResponsiveProp } from "./useResponsiveProp";
import { boxStyleFunctions } from "../theme/src/style-functions";

/**
 * Hook to convert an atomic component style config to the appropriate React Native styles
 * @param themeComponentKey Name of the component in theme.components who's config needs to be used
 * @param receivedProps Raw props passed to the component where the hook is being used
 * @param sizeAndVariantProps Custom size and variant configuration to use
 * @param colorScheme Active color scheme of the component
 * @param styleFunctions List of style functions to use for computing the received style props
 * @returns
 */
export const useAtomicComponentConfig = (
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
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions as StyleFunctionContainer[]
) => {
  const { theme } = useTheme();

  // Check if the themeComponentKey exists in theme.components
  checkKeyAvailability(
    themeComponentKey as string,
    theme.components,
    "theme.components"
  );

  // Get the size and variant for the current screen size
  const sizeForCurrentScreenSize = useResponsiveProp(
    sizeAndVariantProps.size
  ) as string;
  const variantForCurrentScreenSize = useResponsiveProp(
    sizeAndVariantProps.variant
  ) as string;

  // Get the component style config from theme.components
  const componentStyleConfig = theme.components[themeComponentKey];
  const activeSizeAndVariantConfig: AtomicComponentConfig["defaults"] = {};

  let finalComponentProps: Record<string, any> = {};
  if (componentStyleConfig.hasOwnProperty("defaults")) {
    const defaultComponentConfig = (componentStyleConfig as any)[
      "defaults"
    ] as NonNullable<AtomicComponentConfig["defaults"]>;

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

    // Get the component type styles
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
            (componentStyleConfig as any)!.sizes!,
            `theme.components['${String(themeComponentKey)}']['sizes']`
          );

          activeSizeAndVariantStyles = (componentStyleConfig as any)!.sizes![
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
            (componentStyleConfig as any)!.variants!,
            `theme.components['${String(themeComponentKey)}']['variants']`
          );

          activeSizeAndVariantStyles = (componentStyleConfig as any)!.variants![
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

    // Merge the component base style with the component type styles
    finalComponentProps = {
      ...componentStyleConfig["baseStyle"],
      ...componentTypeStyles,
    };
  } else {
    finalComponentProps = componentStyleConfig["baseStyle"];
  }

  // Apply the active color scheme to the final component props
  finalComponentProps = useColorScheme(colorScheme, finalComponentProps);

  // Merge the user override props with the final component props
  finalComponentProps = {
    ...finalComponentProps,
    ...receivedProps,
    style: {
      ...finalComponentProps.style,
      ...receivedProps.style,
    },
  };

  // Compute the component styles using the useStyleProps hook
  const componentStyles = useStyleProps(finalComponentProps, styleFunctions);

  return componentStyles;
};
