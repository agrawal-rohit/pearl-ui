import React, { ReactElement } from "react";
import { FinalPearlTheme, ResponsiveValue } from "../../../theme/src/types";
import { getKeys } from "../../../theme/utils/type-helpers";
import { useStyleProps } from "../../../hooks/useStyleProps";
import Box, { BoxProps } from "../box/box";
import { positionStyleFunction } from "../../../theme/src/style-functions";

export type StackProps = BoxProps & {
  /**
   * The direction to stack the items
   *
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";
  /**
   * The spacing between the elements
   *
   * @default 2
   */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /** If specified, each stack item will show the provided divider */
  divider?: React.ReactElement;
};

export type ZStackProps = BoxProps & {
  /**
   * Specifies the stacking order of the provided elements
   *
   * @default false
   */
  reversed?: boolean;
};

/**
 * Stack is a layout component that makes it easy to stack elements together and apply a space between them.
 */
const Stack = React.memo(
  React.forwardRef(
    (
      { children, direction = "vertical", spacing = "2", ...rest }: StackProps,
      ref: any
    ) => {
      const arrayChildren = React.Children.toArray(children);

      /**
       * Renders the children of the stack.
       *
       * @returns The rendered children.
       */
      const renderChildren = React.useMemo(() => {
        return arrayChildren.map((child, index) => {
          const isLast = index === arrayChildren.length - 1;

          return (
            <Box
              key={index}
              flexDirection={direction === "horizontal" ? "row" : "column"}
              mr={
                !isLast
                  ? direction === "horizontal"
                    ? spacing
                    : undefined
                  : undefined
              }
              mb={
                !isLast
                  ? direction === "vertical"
                    ? spacing
                    : undefined
                  : undefined
              }
            >
              {React.cloneElement(child as ReactElement)}
              {rest.divider &&
                !isLast &&
                React.cloneElement(rest.divider, {
                  orientation:
                    direction === "horizontal" ? "vertical" : "horizontal",
                  ml: direction === "horizontal" ? spacing : undefined,
                  mt: direction === "vertical" ? spacing : undefined,
                })}
            </Box>
          );
        });
      }, [arrayChildren, direction, spacing, rest.divider]);

      return (
        <Box
          {...rest}
          flexDirection={direction === "horizontal" ? "row" : "column"}
          flexWrap={direction === "horizontal" ? "wrap" : "nowrap"}
          ref={ref}
        >
          {renderChildren}
        </Box>
      );
    }
  )
);

/**
 * HStack is a layout component that stacks elements horizontally and apply a space between them.
 */
export const HStack = React.memo(
  React.forwardRef<Omit<StackProps, "direction">, any>(
    ({ children, ...rest }, ref) => {
      return (
        <Stack {...rest} direction="horizontal" ref={ref}>
          {children}
        </Stack>
      );
    }
  )
);

/**
 * VStack is a layout component that stacks elements vertically and apply a space between them.
 */
export const VStack = React.memo(
  React.forwardRef<Omit<StackProps, "direction">, any>(
    ({ children, ...rest }, ref) => {
      return (
        <Stack {...rest} direction="vertical" ref={ref}>
          {children}
        </Stack>
      );
    }
  )
);

/**
 * ZStack is a layout component that stacks elements on top of each other.
 */
export const ZStack = React.memo(
  React.forwardRef<Omit<ZStackProps, "direction">, any>(
    ({ children, reversed = false, ...rest }, ref) => {
      const arrayChildren = React.Children.toArray(children);

      /**
       * Renders the children of the stack.
       *
       * @returns The rendered children.
       */
      const renderChildren = React.useMemo(() => {
        return arrayChildren.map((child, index) => {
          const isOverridenZIndexProvided =
            (child as ReactElement).props &&
            getKeys((child as ReactElement).props).includes("zIndex");
          const computedZIndex = useStyleProps((child as ReactElement).props, [
            ...positionStyleFunction,
          ]);

          return React.cloneElement(child as ReactElement, {
            ...(child as ReactElement).props,
            style: {
              position: index === 0 ? "relative" : "absolute",
              zIndex: isOverridenZIndexProvided
                ? computedZIndex.style.zIndex
                : reversed
                ? arrayChildren.length - index
                : index,
              ...(child as ReactElement).props.style,
            },
          });
        });
      }, [arrayChildren, reversed]);

      return (
        <Box alignSelf="flex-start" {...rest} ref={ref}>
          {renderChildren}
        </Box>
      );
    }
  )
);

Stack.displayName = "Stack";
HStack.displayName = "HStack";
VStack.displayName = "VStack";
ZStack.displayName = "ZStack";

export default Stack;
