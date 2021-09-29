import React from "react";
import Box, { BoxProps } from "../Box/Box";

/** A layout component which center aligns it's children across both axes */
const Center: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box alignItems="center" justifyContent="center" {...props}>
      {children}
    </Box>
  );
};

export default Center;
