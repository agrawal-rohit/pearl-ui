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
import _, { over } from "lodash";
import { useStyledProps } from "./useStyledProps";
import { boxStyleFunctions } from "../theme/src/styleFunctions";

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
  targetKeyForOverridenStyleProps: string | undefined = undefined,
  targetKeyForOverridenNativeProps: string | undefined = undefined
) => {
  const { theme } = useTheme();

  checkKeyAvailability(
    componentName as string,
    theme.components,
    "theme.components"
  );

  // User overriden props
  const overridenProps = useStyledProps(receivedProps, styleFunctions);

  // Responsive Size and Variant
  const sizeForCurrentScreenSize = useResponsiveProp(
    sizeAndVariantProps.size
  ) as string;
  const variantForCurrentScreenSize = useResponsiveProp(
    sizeAndVariantProps.variant
  ) as string;

  const componentStyleConfig = theme.components[
    componentName
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
        `Key 'parts' does not exist in theme.components["${componentName}"]`
      );
    }
    const componentParts = componentStyleConfig.parts;

    if (!componentParts.includes("root") && componentParts[0] !== "root")
      throw new Error(
        `The first part in the component '${componentName}' should be named 'root'`
      );

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
                `theme.components['${String(componentName)}']`
              );

              checkKeyAvailability(
                activeSizeAndVariantConfig["size"] as string,
                componentStyleConfig!.sizes!,
                `theme.components['${String(componentName)}']['sizes']`
              );

              activeSizeAndVariantStyles =
                componentStyleConfig!.sizes![
                  activeSizeAndVariantConfig[currProp] as string
                ][part];
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
              ...overridenProps.style,
            },
          };
        }

        if (
          targetKeyForOverridenNativeProps &&
          part === targetKeyForOverridenNativeProps
        ) {
          const { style, ...nativeOverridenProps } = overridenProps;
          currentComponentPartProps = {
            ...currentComponentPartProps,
            ...nativeOverridenProps,
          };
        }

        // For child references
        if (partStyle) {
          if (overridenProps.atoms)
            currentComponentPartProps = {
              ...currentComponentPartProps,
              ...overridenProps.atoms[part],
            };

          return {
            ...partStyle,
            atoms: {
              ...partStyle.atoms,
              [part]: currentComponentPartProps,
            },
          };
        }

        // Style props by default go to the 'root' part
        if (!targetKeyForOverridenStyleProps) {
          currentComponentPartProps = {
            ...currentComponentPartProps,
            style: {
              ...currentComponentPartProps.style,
              ...overridenProps.style,
            },
          };
        }

        // Native props by default go to the 'root' part
        if (!targetKeyForOverridenNativeProps) {
          const { style, ...nativeOverridenProps } = overridenProps;
          currentComponentPartProps = {
            ...currentComponentPartProps,
            ...nativeOverridenProps,
          };
        }

        return currentComponentPartProps;
      },
      null
    );
  } else {
    finalComponentProps = componentStyleConfig["baseStyle"];

    // Pass the overriden props to the first part
    finalComponentProps = {
      ...finalComponentProps.root,
      ...overridenProps,
      style: {
        ...finalComponentProps.root.style,
        ...overridenProps.style,
      },
      atoms: {
        ..._.omit(finalComponentProps, "root"),
        ...overridenProps.atoms,
      },
    };
  }

  finalComponentProps = useColorScheme(colorScheme, finalComponentProps);

  return finalComponentProps;
};
