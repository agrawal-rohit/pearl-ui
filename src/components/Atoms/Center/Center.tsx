import React from "react";
import Box, { BoxProps } from "../Box/Box";

const Center: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box alignItems="center" justifyContent="center" {...rest}>
      {children}
    </Box>
  );
};

export default Center;
