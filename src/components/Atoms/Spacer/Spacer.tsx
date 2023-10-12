import React from "react";
import Box, { BoxProps } from "../box/box";

/** A layout component that creates an adjustable, empty space that can be used to tune the spacing between sibling elements */
const Spacer: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box {...rest} flex={1} alignSelf="stretch">
      {children}
    </Box>
  );
};

export default Spacer;
