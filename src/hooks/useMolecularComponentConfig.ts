import {
  ColorScheme,
  FinalPearlTheme,
  MolecularComponentConfig,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../theme/src/types";
import { getKeys } from "../theme/utils/type-helpers";
import { useTheme } from "./useTheme";
import {
  MOTI_PROPS,
  checkKeyAvailability,
  composeStyleProps,
} from "./utils/utils";
import { useColorScheme } from "./useColorScheme";
import { useResponsiveProp } from "./useResponsiveProp";
import { useStyleProps } from "./useStyleProps";
import { boxStyleFunctions } from "../theme/src/style-functions";
import { removeUndefined } from "../theme/utils/utils";
import { StyleSheetProperties } from "react-native";
import { useMemo } from "react";
import _ from "lodash";

/**
 * useMolecularComponentConfig is a custom hook used to convert a molecular component style config to the appropriate React Native styles.
 * It takes the benefits of the useAtomicComponentConfig hook to the next level, allowing you to create complex components by combining different atomic components while still maintaining the ease of the styling through a component style config.
 *
 * @param themeComponentKey Name of the component in PearlTheme.components who's config needs to be used
 * @param receivedProps Raw props passed to the component where the hook is being used
 * @param sizeAndVariantProps Custom size and variant configuration to use
 * @param colorScheme Active color scheme of the component
 * @param styleFunctions List of style functions to use for computing the received style props
 * @param partForOverridenStyleProps The part where the style props passed to the component instance should be reflected. If undefined, the style props are passed to the first part as specified in the config
 * @param partForOverridenNativeProps The part where other native props (non-style props) passed to the component instance should be reflected. If undefined, the native props are passed to the first part as specified in the config
 * @param partForOverridenAnimationProps The part where animation props passed to the component instance should be reflected. If undefined, the animation props are passed to the first part as specified in the config
 * @returns
 */
export const useMolecularComponentConfig = <
  ComponentAtoms extends Record<string, any> = Record<string, any>,
>(
  componentName: keyof FinalPearlTheme["components"],
  receivedProps: Record<string, any>,
  sizeAndVariantProps: {
    size?: ResponsiveValue<string | undefined>;
    variant?: ResponsiveValue<string | undefined>;
  } = {
    size: undefined,
    variant: undefined,
  },
  colorScheme: ColorScheme = "primary",
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions as StyleFunctionContainer[],
  partForOverridenStyleProps: string | undefined = undefined,
  partForOverridenNativeProps: string | undefined = undefined,
  partForOverridenAnimationProps: string | undefined = undefined
): {
  atoms: ComponentAtoms;
  style?: StyleSheetProperties;
} => {
  const { theme } = useTheme();

  checkKeyAvailability(
    componentName as string,
    theme.components,
    "theme.components"
  );

  // User overriden props
  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );
  const overridenStyleProps = useMemo(
    () => _.pick(receivedProps, buildStyleProperties.properties),
    [receivedProps, buildStyleProperties]
  );
  const overridenAnimationProps = useMemo(
    () => _.pick(receivedProps, MOTI_PROPS),
    [receivedProps]
  );
  const overridenNativeProps = useMemo(
    () =>
      _.omit(receivedProps, [
        ...MOTI_PROPS,
        "style",
        ...buildStyleProperties.properties,
      ]),
    [receivedProps, buildStyleProperties]
  );
  const overridenProps = useStyleProps(receivedProps, styleFunctions);

  // Responsive Size and Variant
  const sizeForCurrentScreenSize = useResponsiveProp(
    sizeAndVariantProps.size
  ) as string;
  const variantForCurrentScreenSize = useResponsiveProp(
    sizeAndVariantProps.variant
  ) as string;

  const componentStyleConfig = useMemo(
    () => theme.components[componentName] as MolecularComponentConfig,
    [theme, componentName]
  );
  const activeSizeAndVariantConfig: MolecularComponentConfig["defaults"] = {};

  const defaultComponentConfig = useMemo(
    () =>
      componentStyleConfig["defaults"] as NonNullable<
        MolecularComponentConfig["defaults"]
      >,
    [componentStyleConfig]
  );

  if (defaultComponentConfig) {
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
  }

  if (!componentStyleConfig.hasOwnProperty("parts")) {
    throw new Error(
      `Key 'parts' does not exist in theme.components["${componentName}"]`
    );
  }

  let finalComponentProps: Record<string, any> = {};

  // Assign overriden props to the root
  if (!partForOverridenStyleProps) {
    finalComponentProps = {
      ...finalComponentProps,
      ...removeUndefined(overridenStyleProps),
      style: receivedProps.style,
    };
  }

  // Native props by default go to the 'root' part
  if (!partForOverridenNativeProps) {
    finalComponentProps = {
      ...finalComponentProps,
      ...removeUndefined(overridenNativeProps),
    };
  }

  // Native props by default go to the 'root' part
  if (!partForOverridenAnimationProps) {
    finalComponentProps = {
      ...finalComponentProps,
      transition: {
        type: "spring",
        dampingRatio: 1,
        duration: 100,
      },
      ...removeUndefined(overridenAnimationProps),
    };
  }

  (componentStyleConfig.parts as string[]).forEach((part) => {
    const componentTypeStyles: Record<string, any> = getKeys(
      activeSizeAndVariantConfig
    ).reduce(
      (style: any, currProp: keyof typeof activeSizeAndVariantConfig) => {
        let activeSizeAndVariantStyles: Record<string, any>;
        if (currProp === "size") {
          checkKeyAvailability(
            "sizes",
            componentStyleConfig,
            `theme.components['${String(componentName)}']`
          );

          checkKeyAvailability(
            activeSizeAndVariantConfig["size"] as string,
            componentStyleConfig!.sizes!,
            `theme.components['${String(componentName)}']['sizes']`
          );

          let partConfig =
            componentStyleConfig!.sizes![
              activeSizeAndVariantConfig[currProp] as string
            ][part];
          if (typeof partConfig === "function")
            partConfig = partConfig(
              activeSizeAndVariantConfig.variant,
              colorScheme
            );
          activeSizeAndVariantStyles = partConfig;
        } else {
          checkKeyAvailability(
            "variants",
            componentStyleConfig,
            `theme.components['${String(componentName)}']`
          );

          checkKeyAvailability(
            activeSizeAndVariantConfig["variant"] as string,
            componentStyleConfig!.variants!,
            `theme.components['${String(componentName)}']['variants']`
          );

          let partConfig =
            componentStyleConfig!.variants![
              activeSizeAndVariantConfig[currProp] as string
            ][part];
          if (typeof partConfig === "function")
            partConfig = partConfig(
              activeSizeAndVariantConfig.size,
              colorScheme
            );
          activeSizeAndVariantStyles = partConfig;
        }

        if (style) {
          return {
            ...style,
            ...removeUndefined(activeSizeAndVariantStyles),
          };
        }

        return activeSizeAndVariantStyles;
      },
      null
    );

    let currentComponentPartProps = {
      ...((componentStyleConfig["baseStyle"] || {})[part] || {}),
      ...removeUndefined(componentTypeStyles),
    };

    if (partForOverridenStyleProps && part === partForOverridenStyleProps) {
      currentComponentPartProps = {
        ...currentComponentPartProps,
        ...removeUndefined(overridenStyleProps),
        style: {
          ...currentComponentPartProps.style,
          ...removeUndefined(overridenProps.style),
        },
      };
    }

    if (partForOverridenNativeProps && part === partForOverridenNativeProps) {
      currentComponentPartProps = {
        ...currentComponentPartProps,
        ...removeUndefined(overridenNativeProps),
      };
    }

    if (
      partForOverridenAnimationProps &&
      part === partForOverridenAnimationProps
    ) {
      currentComponentPartProps = {
        ...currentComponentPartProps,
        transition: {
          type: "spring",
          dampingRatio: 1,
          duration: 100,
        },
        ...removeUndefined(overridenAnimationProps),
      };
    }

    // For child references
    if (overridenProps.atoms && overridenProps.atoms[part])
      currentComponentPartProps = {
        ...currentComponentPartProps,
        ...removeUndefined(overridenProps.atoms[part]),
      };

    finalComponentProps = {
      ...finalComponentProps,
      atoms: {
        ...finalComponentProps.atoms,
        [part]: currentComponentPartProps,
      },
    };
  });

  finalComponentProps = useColorScheme(colorScheme, finalComponentProps);
  return finalComponentProps as {
    atoms: ComponentAtoms;
    style?: StyleSheetProperties;
  };
};
