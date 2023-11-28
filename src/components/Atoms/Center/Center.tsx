import React from "react";
import Box, { BoxProps } from "../box/box";

/**
 * A layout component that centers its child within itself across both axes
 */
const Center = React.forwardRef(({ children, ...rest }: BoxProps, ref: any) => {
  return (
    <Box {...rest} ref={ref} alignItems="center" justifyContent="center">
      {children}
    </Box>
  );
});

Center.displayName = "Center";

export default Center;
