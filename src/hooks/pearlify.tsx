import {
  ComponentTypeProps,
  FinalPearlTheme,
  PearlComponent,
  StyleFunctionContainer,
} from "../theme/src/types";
import React from "react";
import { useAtomicComponentConfig } from "./useAtomicComponentConfig";
import { boxStyleFunctions, BoxStyleProps } from "../theme/src/styleFunctions";
import { useStyledProps } from "./useStyledProps";
import { useMolecularComponentConfig } from "./useMolecularComponentConfig";
import { motify } from "moti";
import { useMotiWithStyleProps } from "./useMotiWithStyleProps";

interface PearlifyConfig {
  componentName: keyof FinalPearlTheme["components"];
  type: "basic" | "atom" | "molecule";
  animatable?: boolean;
}

/**
 * Hook to convert a third-party component to a Pearl atom component that can be configured using style props, an atomic component configuration or a molecular component configuration.
 * @param Component The base component on which the pearlification has to be applied
 * @param config A configuration object that adds metadata to a component that's required by Pearl UI
 * @param styleFunctions The set of style functions that would define the style props that should be supported by the pearlified component
 * @returns
 */
export function pearlify<
  ComponentProps,
  ComponentType extends "basic" | "atom" | "molecule" = "basic",
  StyleProps = BoxStyleProps
>(
  Component: any,
  config: PearlifyConfig = {
    componentName: "None",
    type: "basic",
    animatable: true,
  },
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions
) {
  let FinalComponent: any;
  if (config.animatable && config.type !== "molecule") {
    // Convert the provided component to a Class component
    class ConvertedClassComponent extends React.Component {
      static displayName = `PearlMoti${Component.name}` || `NoName`;

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

  return React.forwardRef(
    (
      {
        children,
        ...rest
      }: PearlComponent<ComponentProps, StyleProps> &
        ComponentTypeProps<typeof config["componentName"], ComponentType> & {
          children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
        },
      ref: any
    ) => {
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
          styleFunctions
        );
      } else {
        convertedProps = useStyledProps(rest, styleFunctions);

        if (config.animatable)
          convertedProps = useMotiWithStyleProps(
            convertedProps,
            styleFunctions
          );
      }

      return (
        <FinalComponent {...convertedProps} ref={ref}>
          {children}
        </FinalComponent>
      );
    }
  );
}
