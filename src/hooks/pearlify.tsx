import {
  AtomicComponentConfig,
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../theme/src/types";
import React from "react";
import { useAtomicComponentConfig } from "./useAtomicComponentConfig";
import { all, AllProps } from "../theme/src/styleFunctions";

/**
 * Hook to convert a third-party component to a Pearl atom component that can be configured using an atomic component configuration.
 * @param Component Original component to be passed on where the atomic component configuration has to be applied.
 * @param componentName Name of the custom component that would be stored in the active Pearl theme.
 * @returns
 */
export function pearlify<P>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return React.forwardRef(
    (
      {
        children,
        ...rest
      }: P &
        AllProps & {
          size?: ResponsiveValue<ComponentSizes<typeof componentName>>;
          variant?: ResponsiveValue<ComponentVariants<typeof componentName>>;
          colorScheme?: ColorScheme;
          children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
        },
      ref: any
    ) => {
      const atomicProps = useAtomicComponentConfig(
        componentName,
        rest,
        {
          size: rest.size,
          variant: rest.variant,
        },
        rest.colorScheme,
        all
      );
      return (
        <Component {...(atomicProps as P)} ref={ref}>
          {children}
        </Component>
      );
    }
  );
}
