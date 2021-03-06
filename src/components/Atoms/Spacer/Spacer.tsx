import React from "react";
import Box, { BoxProps } from "../Box/Box";

/** A layout component that creates an adjustable, empty space that can be used to tune the spacing between sibling elements */
const Spacer: React.FC<BoxProps> = ({ children, ...rest }) => {
  const arrayChildren = React.Children.toArray(children);

  return (
    <Box {...rest} flex={1} alignSelf="stretch">
      {children}
    </Box>
  );
};

export default Spacer;
