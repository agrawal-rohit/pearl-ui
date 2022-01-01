import {
  AtomicComponentConfig,
  ColorScheme,
  FinalPearlTheme,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../theme/src/types";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import { boxStyleFunctions } from "../components/Atoms/Box/Box";
import { useStyledProps } from "./useStyledProps";
import { checkKeyAvailability } from "./utils/utils";
import { useColorScheme } from "./useColorScheme";
import {
  getValueForScreenSize,
  isResponsiveObjectValue,
} from "../theme/src/responsiveHelpers";
import { useDimensions } from "./useDimensions";
import { useResponsiveProp } from "./useResponsiveProp";

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

  // User overriden props
  const overridenProps = useStyledProps(receivedProps, styleFunctions);

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

    finalComponentProps = {
      ...componentStyleConfig["baseStyle"],
      ...componentTypeStyles,
    };
  } else {
    finalComponentProps = componentStyleConfig["baseStyle"];
  }

  finalComponentProps = useColorScheme(colorScheme, finalComponentProps);
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
