import {
  AtomComponent,
  ComponentTypes,
  FinalPearlTheme,
  MoleculeComponent,
  PearlComponent,
  StyleFunctionContainer,
} from "./theme/src/types";
import React from "react";
import { useAtomicComponentConfig } from "./hooks/useAtomicComponentConfig";
import { boxStyleFunctions, BoxStyleProps } from "./theme/src/style-functions";
import { useStyleProps } from "./hooks/useStyleProps";
import { useMolecularComponentConfig } from "./hooks/useMolecularComponentConfig";
import { MotiView, motify } from "moti";
import { useMotiWithStyleProps } from "./hooks/useMotiWithStyleProps";
import { useTheme } from "./hooks/useTheme";
import { Platform } from "react-native";

/**
 * Configuration object that adds metadata to a component that's required by Pearl UI
 */
interface pearlConfig {
  /**
   * The name of the component in the FinalPearlTheme
   */
  componentName: keyof FinalPearlTheme["components"];
  /**
   * The type of the component
   */
  type: ComponentTypes;
  /**
   * Whether the component is animatable or not
   */
  animatable?: boolean;
}

/**
 * Hook to convert a third-party component to a Pearl component that can be configured using style props, an atomic component configuration or a molecular component configuration.
 * @param Component The base component on which the pearlification has to be applied
 * @param config A configuration object that adds metadata to a component that's required by Pearl UI
 * @param styleFunctions The set of style functions that would define the style props that should be supported by the pearlified component
 * @param moleculeConfigOptions The options for configuring the molecular component
 * @returns
 */
export function pearl<
  ComponentProps,
  ComponentType extends ComponentTypes = "basic",
  ComponentAtoms extends Record<string, any> = Record<string, any>,
  StyleProps = BoxStyleProps,
  Animateable extends boolean = true,
>(
  Component: any,
  config: pearlConfig = {
    componentName: "None",
    type: "basic",
    animatable: true,
  },
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions,
  moleculeConfigOptions: {
    partForOverridenStyleProps?: string | undefined;
    partForOverridenNativeProps?: string | undefined;
    partForOverridenAnimationProps?: string | undefined;
  } = {}
) {
  let FinalComponent: any | undefined;
  const isAnimatable = !!config.animatable && config.type !== "molecule";

  if (isAnimatable) {
    const ConvertedClassComponent = class extends React.Component<any, any> {
      static displayName = `Pearl${
        Component.name ?? Component.displayName ?? `NoName`
      }`;

      render() {
        const { children, ...props } = this.props;
        return (
          <Component ref={(props as any).forwardedRef} {...props}>
            {children}
          </Component>
        );
      }
    };

    if (Platform.OS === "web" && config.componentName === "Box")
      FinalComponent = MotiView;
    else FinalComponent = motify(ConvertedClassComponent)();
  } else {
    FinalComponent = Component;
  }

  return React.memo(
    React.forwardRef(
      (
        {
          children,
          ...rest
        }: PearlComponent<ComponentProps, StyleProps, Animateable> &
          AtomComponent<(typeof config)["componentName"], ComponentType> &
          MoleculeComponent<(typeof config)["componentName"], ComponentType> & {
            atoms?: Partial<ComponentAtoms>;
            children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
          },
        ref: any
      ) => {
        const { colorMode } = useTheme();

        let convertedProps;
        if (config.type === "atom") {
          convertedProps = useAtomicComponentConfig(
            config["componentName"],
            rest,
            {
              size: (rest as any).size,
              variant: (rest as any).variant,
            },
            rest.colorScheme,
            styleFunctions
          );
          if (config.animatable)
            convertedProps = useMotiWithStyleProps(
              convertedProps,
              styleFunctions
            );
        } else if (config.type === "molecule") {
          convertedProps = useMolecularComponentConfig(
            config["componentName"],
            rest,
            {
              size: (rest as any).size,
              variant: (rest as any).variant,
            },
            rest.colorScheme,
            styleFunctions,
            moleculeConfigOptions.partForOverridenStyleProps,
            moleculeConfigOptions.partForOverridenNativeProps,
            moleculeConfigOptions.partForOverridenAnimationProps
          );
        } else {
          convertedProps = useStyleProps(rest, styleFunctions);
          if (config.animatable) {
            convertedProps = useMotiWithStyleProps(
              convertedProps,
              styleFunctions
            );
          }
        }

        return (
          <FinalComponent
            {...convertedProps}
            key={
              Platform.OS === "web" &&
              ["Text", "Icon", "Box"].includes(config.componentName as string)
                ? (convertedProps as any).key!
                  ? `${(convertedProps as any).key!}-${colorMode}`
                  : `${colorMode}`
                : undefined
            }
            ref={ref}
          >
            {children}
          </FinalComponent>
        );
      }
    )
  );
}
