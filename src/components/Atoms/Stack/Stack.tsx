import React, { ReactElement } from "react";
import { FinalPearlTheme, ResponsiveValue } from "../../../theme/src/types";
import { getKeys } from "../../../theme/utils/typeHelpers";
import { useStyleProps } from "../../../hooks/useStyleProps";
import Box, { BoxProps } from "../Box/Box";
import { positionStyleFunction } from "../../../theme/src/styleFunctions";

export type StackProps = BoxProps & {
  /** The direction to stack the items */
  direction: "horizontal" | "vertical";
  /** The spacing between the elements */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /** If specified, each stack item will show the provided divider */
  divider?: React.ReactElement;
};

export type ZStackProps = BoxProps & {
  /** Specifies the stacking order of the provided elements */
  reversed?: boolean;
};

/** Stack is a layout component that makes it easy to stack elements together and apply a space between them. */
const Stack: React.FC<StackProps> = ({ children, ...rest }) => {
  const arrayChildren = React.Children.toArray(children);

  const renderChildren = () => {
    return React.Children.map(arrayChildren, (child, index) => {
      const isLast = index === arrayChildren.length - 1;

      return (
        <Box
          alignSelf="stretch"
          flexDirection={rest.direction === "horizontal" ? "row" : "column"}
          mr={
            !isLast
              ? rest.direction === "horizontal"
                ? rest.spacing
                : undefined
              : undefined
          }
          mb={
            !isLast
              ? rest.direction === "vertical"
                ? rest.spacing
                : undefined
              : undefined
          }
        >
          {React.cloneElement(child as ReactElement)}

          {rest.divider &&
            !isLast &&
            React.cloneElement(rest.divider, {
              orientation:
                rest.direction === "horizontal" ? "vertical" : "horizontal",
              ml: rest.direction === "horizontal" ? rest.spacing : undefined,
              mt: rest.direction === "vertical" ? rest.spacing : undefined,
            })}
        </Box>
      );
    });
  };

  return (
    <Box
      alignSelf="flex-start"
      {...rest}
      flexDirection={rest.direction === "horizontal" ? "row" : "column"}
      flexWrap={rest.direction === "horizontal" ? "wrap" : "nowrap"}
    >
      {renderChildren()}
    </Box>
  );
};

/** HStack is a layout component that stacks elements horizontally and apply a space between them. */
export const HStack: React.FC<Omit<StackProps, "direction">> = ({
  children,
  ...rest
}) => {
  return (
    <Stack {...rest} direction="horizontal">
      {children}
    </Stack>
  );
};

/** VStack is a layout component that stacks elements vertically and apply a space between them. */
export const VStack: React.FC<Omit<StackProps, "direction">> = ({
  children,
  ...rest
}) => {
  return (
    <Stack {...rest} direction="vertical">
      {children}
    </Stack>
  );
};

/** ZStack is a layout component that stacks elements on top of each other. */
export const ZStack: React.FC<ZStackProps> = ({
  children,
  reversed = false,
  ...rest
}) => {
  const arrayChildren = React.Children.toArray(children);

  const renderChildren = () => {
    return React.Children.map(arrayChildren, (child, index) => {
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
  };

  return (
    <Box alignSelf="flex-start" {...rest}>
      {renderChildren()}
    </Box>
  );
};

export default Stack;
