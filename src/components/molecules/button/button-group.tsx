import React, { ReactElement, createContext, useContext } from "react";
import {
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  FinalPearlTheme,
  ResponsiveValue,
} from "../../../theme/src/types";
import { BoxProps } from "../../atoms/box/box";
import Stack from "../../atoms/stack/stack";

/**
 * ButtonGroupContext interface
 * This interface defines the properties for the ButtonGroupContext
 */
interface IButtonGroupContext {
  /** Size of all the buttons in the group. */
  size?: ResponsiveValue<ComponentSizes<"Button">>;
  /** Variant of all the buttons in the group. */
  variant?: ResponsiveValue<ComponentVariants<"Button">>;
  /** Whether the button group is disabled.  */
  isDisabled?: boolean;
  /** Active color palette of all the buttons in the group. */
  colorScheme?: ColorScheme;
}

const buttonGroupContext = createContext({} as IButtonGroupContext);

/**
 * Hook to get access to the state of a Button group
 */
export const useButtonGroup = () =>
  useContext(buttonGroupContext) as IButtonGroupContext;

/**
 * ButtonGroupProps interface
 * This interface defines the properties for the ButtonGroup component
 */
export type ButtonGroupProps = BoxProps & {
  /**
   * Size of all the buttons in the group.
   *
   * @default "m"
   */
  size?: ResponsiveValue<ComponentSizes<"Button">>;
  /**
   * Variant of all the buttons in the group.
   *
   * @default "filled"
   */
  variant?: ResponsiveValue<ComponentVariants<"Button">>;
  /**
   * Whether the button group is disabled.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the buttons in the group are attached to each other.
   *
   * @default false
   */
  isAttached?: boolean;
  /**
   * The spacing between the elements.
   *
   * @default 2
   */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
};

/**
 * ButtonGroup is a layout component that makes it easy to stack buttons together and apply a space between them.
 */
const ButtonGroup = React.memo(
  React.forwardRef(
    (
      {
        children,
        isDisabled = false,
        isAttached = false,
        spacing = "2",
        size = "m",
        variant = "filled",
        colorScheme = "primary",
        ...rest
      }: ButtonGroupProps,
      ref: any
    ) => {
      const arrayChildren = React.Children.toArray(children);

      /**
       * Renders the children of the ButtonGroup.
       *
       * @returns The rendered children.
       */
      const renderChildren = React.useCallback(() => {
        return arrayChildren.map((child, index) => {
          const isFirst = index === 0;
          const isLast = index === arrayChildren.length - 1;

          return React.cloneElement(child as ReactElement, {
            borderRadius: isAttached && !isFirst && !isLast ? 0 : undefined,
            borderTopRightRadius: isAttached && isFirst ? 0 : undefined,
            borderBottomRightRadius: isAttached && isFirst ? 0 : undefined,
            borderTopLeftRadius: isAttached && isLast ? 0 : undefined,
            borderBottomLeftRadius: isAttached && isLast ? 0 : undefined,
            borderRightWidth: isAttached && !isLast ? 0 : undefined,
          });
        });
      }, [arrayChildren, isAttached]);

      return (
        <buttonGroupContext.Provider
          value={{
            size: size,
            variant: variant,
            isDisabled: isDisabled,
            colorScheme: colorScheme,
          }}
        >
          <Stack
            direction="horizontal"
            spacing={isAttached ? 0 : spacing}
            ref={ref}
            {...rest}
          >
            {renderChildren()}
          </Stack>
        </buttonGroupContext.Provider>
      );
    }
  )
);

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
