import React from "react";
import { baseLightTheme } from "../../../theme/src/basetheme";
import Box, { BoxProps } from "../Box/Box";

const Center: React.FC<BoxProps<typeof baseLightTheme>> = ({
  children,
  ...rest
}) => {
  return (
    <Box alignItems="center" justifyContent="center" {...rest}>
      {children}
    </Box>
  );
};

export default Center;
