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
import { motify } from "moti";
import { useMotiWithStyleProps } from "./hooks/useMotiWithStyleProps";

/**
 * Configuration object that adds metadata to a component that's required by Pearl UI
 */
interface PearlifyConfig {
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
export function pearlify<
  ComponentProps,
  ComponentType extends ComponentTypes = "basic",
  StyleProps = BoxStyleProps,
  Animateable extends boolean = true,
>(
  Component: any,
  config: PearlifyConfig = {
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
  /**
   * The final component that will be returned
   */
  let FinalComponent: any | undefined;
  if (config.animatable && config.type !== "molecule") {
    /**
     * Class component that wraps the base component and adds animation functionality
     */
    class ConvertedClassComponent extends React.Component<any, any> {
      static displayName = `PearlMoti${Component.name ?? `NoName`}`;

      render() {
        const { children, ...props } = this.props;

        return (
          <Component ref={(props as any).forwardedRef} {...props}>
            {children}
          </Component>
        );
      }
    }

    FinalComponent = motify(ConvertedClassComponent)();
  } else {
    FinalComponent = Component;
  }

  /**
   * The final component that will be returned
   */
  return React.forwardRef(
    (
      {
        children,
        ...rest
      }: PearlComponent<ComponentProps, StyleProps, Animateable> &
        AtomComponent<(typeof config)["componentName"], ComponentType> &
        MoleculeComponent<(typeof config)["componentName"], ComponentType> & {
          children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
        },
      ref: any
    ) => {
      /**
       * The converted props that will be passed to the final component
       */
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
        <FinalComponent {...convertedProps} ref={ref}>
          {children}
        </FinalComponent>
      );
    }
  );
}
