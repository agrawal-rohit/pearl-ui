import React from "react";
import Box, { BoxProps } from "../box/box";

/**
 * A layout component that centers its child within itself across both axes
 */
const Center: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box {...rest} alignItems="center" justifyContent="center">
      {children}
    </Box>
  );
};

export default Center;
