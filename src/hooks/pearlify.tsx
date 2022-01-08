import {
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../theme/src/types";
import React from "react";
import { useAtomicComponentConfig } from "./useAtomicComponentConfig";
import { boxStyleFunctions } from "../theme/src/styleFunctions";
import { BoxProps } from "../components/Atoms/Box/Box";
import { useStyledProps } from "./useStyledProps";
import { useMolecularComponentConfig } from "./useMolecularComponentConfig";

interface PearlifyConfig {
  componentName: string;
  type: "basic" | "atom" | "molecule";
}

/**
 * Hook to convert a third-party component to a Pearl atom component that can be configured using style props, an atomic component configuration or a molecular component configuration.
 * @param Component The base component on which the pearlification has to be applied
 * @param config A configuration object that adds metadata to a component that's required by Pearl UI
 * @param styleFunctions The set of style functions that would define the style props that should be supported by the pearlified component
 * @returns
 */
export function pearlify<P, CustomStyleProps = BoxProps>(
  Component: React.ComponentType<P>,
  config: PearlifyConfig = { componentName: "undefined", type: "basic" },
  styleFunctions: StyleFunctionContainer[] = boxStyleFunctions
) {
  return React.forwardRef(
    (
      {
        children,
        ...rest
      }: P &
        CustomStyleProps & {
          size?: ResponsiveValue<
            ComponentSizes<typeof config["componentName"]>
          >;
          variant?: ResponsiveValue<
            ComponentVariants<typeof config["componentName"]>
          >;
          colorScheme?: ColorScheme;
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
            size: rest.size,
            variant: rest.variant,
          },
          rest.colorScheme,
          styleFunctions
        );
      } else if (config.type === "molecule") {
        convertedProps = useMolecularComponentConfig(
          config["componentName"],
          rest,
          {
            size: rest.size,
            variant: rest.variant,
          },
          rest.colorScheme
        );
      } else {
        convertedProps = useStyledProps(rest, styleFunctions);
      }

      return (
        <Component {...(convertedProps as P)} ref={ref}>
          {children}
        </Component>
      );
    }
  );
}
