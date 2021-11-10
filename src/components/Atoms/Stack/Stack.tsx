import React, { ReactElement } from "react";
import { BasePearlTheme } from "../../../theme/src/types";
import Box, { BoxProps } from "../Box/Box";

type StackProps = BoxProps & {
  /** The direction to stack the items */
  direction: "horizontal" | "vertical";
  /** The spacing between the elements */
  spacing?: keyof BasePearlTheme["spacing"];
  /** If specified, each stack item will show the provided divider */
  divider?: React.ReactElement;
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
      {...rest}
      alignSelf="flex-start"
      flexDirection={rest.direction === "horizontal" ? "row" : "column"}
    >
      {renderChildren()}
    </Box>
  );
};

export default Stack;
